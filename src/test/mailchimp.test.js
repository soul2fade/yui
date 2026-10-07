import { createHash } from 'node:crypto'
import handler, { addRegistrant, sessionTag, splitName } from '../../netlify/functions/submission-created'

const DATA = {
  session: 'Thu Nov 5, 11:45am PT',
  name: 'Pat Q. Owner',
  email: ' Pat@Example.com ',
  business: 'Pat HVAC',
  city: 'Elk Grove',
}
const OPTS = { apiKey: 'key123-us21', audienceId: 'aud1' }
// Mailchimp keys members by the MD5 of the lowercased address.
const HASH = createHash('md5').update('pat@example.com').digest('hex')

function event(form_name, data = DATA) {
  return new Request('http://x', { method: 'POST', body: JSON.stringify({ payload: { form_name, data } }) })
}

describe('webinar -> Mailchimp', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
  })

  it('splits names and tags by session day', () => {
    expect(splitName('Pat Q. Owner')).toEqual({ FNAME: 'Pat', LNAME: 'Q. Owner' })
    expect(splitName('Pat')).toEqual({ FNAME: 'Pat', LNAME: '' })
    expect(sessionTag('Wed Nov 4, 11:45am PT')).toBe('Webinar: Wed Nov 4')
  })

  it('upserts the contact, then tags the session', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    await addRegistrant(DATA, OPTS)

    const [[putUrl, put], [tagUrl, tag]] = fetchMock.mock.calls
    expect(putUrl).toBe(`https://us21.api.mailchimp.com/3.0/lists/aud1/members/${HASH}`)
    expect(put.method).toBe('PUT')
    expect(put.headers.Authorization).toBe(`Basic ${Buffer.from('yui:key123-us21').toString('base64')}`)
    expect(JSON.parse(put.body)).toEqual({
      email_address: 'pat@example.com',
      status_if_new: 'subscribed',
      merge_fields: { FNAME: 'Pat', LNAME: 'Q. Owner', BUSINESS: 'Pat HVAC', CITY: 'Elk Grove' },
    })
    expect(tagUrl).toBe(`${putUrl}/tags`)
    expect(JSON.parse(tag.body)).toEqual({ tags: [{ name: 'Webinar: Thu Nov 5', status: 'active' }] })
  })

  it('still adds the contact when the audience lacks BUSINESS/CITY', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 400, text: async () => 'Your merge fields were invalid' })
      .mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    await addRegistrant(DATA, OPTS)

    expect(fetchMock).toHaveBeenCalledTimes(3)
    expect(JSON.parse(fetchMock.mock.calls[1][1].body).merge_fields).toEqual({ FNAME: 'Pat', LNAME: 'Q. Owner' })
  })

  it('ignores other forms, such as contact', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    vi.stubEnv('MAILCHIMP_API_KEY', OPTS.apiKey)
    vi.stubEnv('MAILCHIMP_AUDIENCE_ID', OPTS.audienceId)
    await handler(event('contact'))
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('never fails the submission when Mailchimp is down or unconfigured', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500, text: async () => 'down' }))
    vi.stubEnv('MAILCHIMP_API_KEY', '')
    expect((await handler(event('webinar'))).status).toBe(200)
    vi.stubEnv('MAILCHIMP_API_KEY', OPTS.apiKey)
    vi.stubEnv('MAILCHIMP_AUDIENCE_ID', OPTS.audienceId)
    expect((await handler(event('webinar'))).status).toBe(200)
  })
})
