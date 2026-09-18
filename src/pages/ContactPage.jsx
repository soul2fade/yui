import { useState } from 'react'
import Meta from '../components/Meta'
import { Eyebrow, Headline } from '../components/ui'
import { EMAIL, LOCATION } from '../site'

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'business', label: 'Business', type: 'text', required: false, autoComplete: 'organization' },
]

// Posts to the Netlify Forms endpoint registered by public/__forms.html.
async function submitToNetlify(formData) {
  const body = new URLSearchParams()
  body.append('form-name', 'contact')
  for (const [key, value] of formData.entries()) {
    body.append(key, value)
  }
  const res = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
}

export default function ContactPage() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')
    try {
      await submitToNetlify(new FormData(event.target))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div data-testid="contact-page">
      <Meta
        title="Contact: book a fit call with Yui"
        description="Tell us what keeps breaking in your operation. Thirty-minute fit calls, no pitch deck. Based in Sacramento."
        path="/contact"
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8 sm:py-24">
          <Eyebrow>Contact</Eyebrow>
          <Headline as="h1" className="mt-5 text-4xl text-ink sm:text-5xl">
            Tell us what keeps breaking
          </Headline>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Send this and we will come back with times for a thirty-minute fit call. No
            deck, no pressure. If we are not the right help, we will say so.
          </p>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,260px)] lg:gap-12">
            <div className="card p-7 sm:p-10">
              {status === 'sent' ? (
                <div aria-live="polite">
                  <span className="mono text-accent">Message sent</span>
                  <h2
                    className="mt-4 text-2xl text-ink"
                    style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
                  >
                    Got it, thank you
                  </h2>
                  <p className="mt-3.5 leading-relaxed text-muted">
                    We read everything that comes in and reply within one business day. If
                    it is urgent, email {EMAIL} directly.
                  </p>
                </div>
              ) : (
                <form
                  name="contact"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-netlify="true"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Do not fill this out if you are human
                      <input name="bot-field" tabIndex={-1} />
                    </label>
                  </p>

                  {FIELDS.map((field) => (
                    <label key={field.name} className="block">
                      <span className="mono block text-muted">
                        {field.label}
                        {!field.required && ' (optional)'}
                      </span>
                      <input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        autoComplete={field.autoComplete}
                        className="mt-2 w-full rounded-[14px] border border-line bg-white px-4 py-3 text-[0.9375rem] text-ink focus:border-accent focus:outline-none"
                      />
                    </label>
                  ))}

                  <label className="block">
                    <span className="mono block text-muted">
                      What is breaking?
                    </span>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="mt-2 w-full resize-none rounded-[14px] border border-line bg-white px-4 py-3 text-[0.9375rem] text-ink focus:border-accent focus:outline-none"
                    />
                  </label>

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
                    className="btn btn-accent w-full sm:w-auto"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send it'}
                  </button>
                </form>
              )}
            </div>

            <aside className="space-y-8">
              <div>
                <span className="mono text-accent">Email</span>
                <p className="mt-2">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-[0.9375rem] text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
                  >
                    {EMAIL}
                  </a>
                </p>
              </div>
              <div>
                <span className="mono text-accent">Based in</span>
                <p className="mt-2 text-[0.9375rem] text-ink">{LOCATION}</p>
              </div>
              <div>
                <span className="mono text-accent">Response time</span>
                <p className="mt-2 text-[0.9375rem] text-ink">One business day</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
