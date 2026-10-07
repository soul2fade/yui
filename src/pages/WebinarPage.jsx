import { useState } from 'react'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta'
import { Eyebrow, Headline } from '../components/ui'
import { EMAIL } from '../site'

// Stop-Doing List webinar registration. Posts to the Netlify Forms endpoint
// registered by public/__forms.html as "webinar". Keep the field names and the
// session values here in sync with that file.
//
// The worksheet is a static file in public/. It is revealed after a successful
// registration, which matches the LinkedIn copy ("You'll get it when you
// register"). It is not truly gated: anyone with the URL can open it.
export const WORKSHEET_HREF = '/yui-stop-doing-list.pdf'

export const SESSIONS = [
  { value: 'Wed Nov 4, 11:45am PT', day: 'Wednesday', date: 'November 4' },
  { value: 'Thu Nov 5, 11:45am PT', day: 'Thursday', date: 'November 5' },
]

const TIME = '11:45am to 12:30pm PT'

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'business', label: 'Business name', type: 'text', autoComplete: 'organization' },
  {
    name: 'city',
    label: 'City where your business is based',
    type: 'text',
    autoComplete: 'address-level2',
  },
]

const OUTCOMES = [
  ['List it', 'Every recurring task you would hand off tomorrow if you could.'],
  ['Count it', 'What each one costs you in hours a month, using your own numbers.'],
  ['Sort it', 'Three questions, in order: drop it, delegate it, or automate it.'],
]

async function submitToNetlify(formData) {
  const body = new URLSearchParams()
  body.append('form-name', 'webinar')
  for (const [key, value] of formData.entries()) {
    if (key !== 'form-name') body.append(key, value)
  }
  const res = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
}

const inputCls =
  'mt-2 w-full rounded-[14px] border border-line bg-white px-4 py-3 text-[0.9375rem] text-ink focus:border-accent focus:outline-none'

export default function WebinarPage() {
  const [status, setStatus] = useState('idle')
  const [session, setSession] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    setSession(data.get('session') || '')
    setStatus('sending')
    try {
      await submitToNetlify(data)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div data-testid="webinar-page">
      <Meta
        title="Free webinar: build your stop-doing list | Yui"
        description="A free 45-minute working session for Sacramento-area business owners. List, count, and sort the tasks eating your week. Nov 4 or Nov 5, 11:45am PT, online."
        path="/webinar"
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-24">
          <Eyebrow>Free live session · Online</Eyebrow>
          <Headline as="h1" className="mt-5 text-4xl text-ink sm:text-5xl">
            Build your stop-doing list
          </Headline>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Your to-do list is full. Nothing leaves it, because nobody ever decided it should.
            In 45 minutes you will work through your own list live and leave with it sorted,
            plus one task moved out of each column.
          </p>
          <a href="#register" className="btn btn-accent mt-8 lg:hidden">
            Save my seat
          </a>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-12">
            <div className="space-y-10">
              <div>
                <span className="mono text-accent">Two dates, same session</span>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {SESSIONS.map((s) => (
                    <div key={s.value} className="card p-6">
                      <p className="mono text-muted">{s.day}</p>
                      <p
                        className="mt-2 text-2xl text-ink"
                        style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
                      >
                        {s.date}
                      </p>
                      <p className="mt-2 text-[0.9375rem] text-muted">{TIME}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="mono text-accent">What you will do</span>
                <ol className="mt-4 space-y-4">
                  {OUTCOMES.map(([title, body], i) => (
                    <li key={title} className="flex gap-4">
                      <span className="mono mt-1 text-muted">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <p className="text-[0.9375rem] font-semibold text-ink">{title}</p>
                        <p className="mt-1 leading-relaxed text-muted">{body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card p-6 sm:p-7">
                <span className="mono text-accent">Comes with the worksheet</span>
                <p className="mt-3 leading-relaxed text-muted">
                  Register and the Stop-Doing List worksheet is yours right away. Print it or
                  fill it in on screen, and have it open when the session starts. You will finish
                  it live.
                </p>
              </div>

              <p className="text-[0.9375rem] leading-relaxed text-muted">
                Built for owners in the Sacramento region, so registration asks where your
                business is based. Hosted by Daniel Zimmer, founder of Yui.
              </p>
            </div>

            <div className="card p-7 sm:p-9 self-start" id="register">
              {status === 'sent' ? (
                <div aria-live="polite">
                  <span className="mono text-accent">You are registered</span>
                  <h2
                    className="mt-4 text-2xl text-ink"
                    style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
                  >
                    See you {session ? session.split(',')[0] : 'there'}
                  </h2>
                  <p className="mt-3.5 leading-relaxed text-muted">
                    We will email your join link before the session. Grab the worksheet now so
                    it is ready when we start.
                  </p>
                  <a href={WORKSHEET_HREF} download className="btn btn-accent mt-6 w-full sm:w-auto">
                    Download the worksheet (PDF)
                  </a>
                  <p className="mt-8 text-[0.9375rem] leading-relaxed text-muted">
                    While you wait, the{' '}
                    <Link
                      to="/audit"
                      className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                    >
                      Operations Health Check
                    </Link>{' '}
                    takes about two minutes and shows where your hours are going.
                  </p>
                </div>
              ) : (
                <form
                  name="webinar"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-netlify="true"
                >
                  <input type="hidden" name="form-name" value="webinar" />
                  <p className="hidden">
                    <label>
                      Do not fill this out if you are human
                      <input name="bot-field" tabIndex={-1} />
                    </label>
                  </p>

                  <fieldset>
                    <legend className="mono block text-muted">Pick a date</legend>
                    <div className="mt-2 space-y-2">
                      {SESSIONS.map((s) => (
                        <label
                          key={s.value}
                          className="flex cursor-pointer items-center gap-3 rounded-[14px] border border-line bg-white px-4 py-3 text-[0.9375rem] text-ink has-[:checked]:border-accent"
                        >
                          <input
                            type="radio"
                            name="session"
                            value={s.value}
                            required
                            className="accent-[#187D6D]"
                          />
                          {s.day}, {s.date}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {FIELDS.map((field) => (
                    <label key={field.name} className="block">
                      <span className="mono block text-muted">{field.label}</span>
                      <input
                        type={field.type}
                        name={field.name}
                        required
                        autoComplete={field.autoComplete}
                        className={inputCls}
                      />
                    </label>
                  ))}

                  {status === 'error' && (
                    <p
                      role="alert"
                      className="rounded-[14px] border border-accent/40 bg-accent/5 p-4 text-[0.9375rem] text-ink"
                    >
                      That did not go through. Try again, or email {EMAIL} directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn btn-accent w-full"
                  >
                    {status === 'sending' ? 'Saving your seat…' : 'Save my seat'}
                  </button>
                  <p className="text-[0.8125rem] leading-relaxed text-muted">
                    Free. {TIME}, online.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
