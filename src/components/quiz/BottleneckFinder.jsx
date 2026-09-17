import { useState } from 'react'
import { BookingLink, Eyebrow, Headline } from '../ui'

// Five-question bottleneck finder. The diagnosis is written server-side by the
// `bottleneck` Netlify function, which keeps the API key off the client.
const QUESTIONS = [
  {
    q: 'What type of organization are you running?',
    opts: [
      'Nonprofit or community organization',
      'Trade or contractor business',
      'Food truck or catering business',
      'Youth sports club or athletic organization',
      'Other small business or service provider',
    ],
  },
  {
    q: 'What is eating the most of your time right now?',
    opts: [
      'Scheduling — juggling who does what and when',
      'Chasing payments or managing invoices',
      'Keeping my team organized and accountable',
      'Client or member communication',
      'Staying on top of paperwork and compliance',
    ],
  },
  {
    q: 'How many people are on your team?',
    opts: ['Just me (or me + 1 other)', '2 – 5 people', '6 – 15 people', '16 or more'],
  },
  {
    q: 'How do you track operations day to day?',
    opts: [
      'Mostly in my head',
      'Spreadsheets or a shared calendar',
      'A mix of apps that do not talk to each other',
      'One main system that mostly works',
    ],
  },
  {
    q: 'How often do things fall through the cracks?',
    opts: [
      'Regularly — it is a constant problem',
      'A few times a month — frustrating but manageable',
      'Occasionally — we usually catch it',
      'Rarely — we have it handled',
    ],
  },
]

async function fetchDiagnosis(answers) {
  const res = await fetch('/api/bottleneck', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error || `HTTP ${res.status}`)
  }
  const data = await res.json()
  return (data.text || '').trim()
}

export default function BottleneckFinder() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const question = QUESTIONS[step]
  const progress = Math.round((step / QUESTIONS.length) * 100)
  const isLast = step === QUESTIONS.length - 1

  async function handleNext() {
    const next = [...answers, question.opts[selected]]
    if (!isLast) {
      setAnswers(next)
      setStep(step + 1)
      setSelected(null)
      return
    }
    setLoading(true)
    try {
      setResult(await fetchDiagnosis(next))
    } catch {
      setResult('Unable to generate a diagnosis right now. Please try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setStep(0)
    setAnswers([])
    setSelected(null)
    setResult(null)
    setLoading(false)
  }

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:px-8 sm:py-24">
        <Eyebrow>Free diagnostic</Eyebrow>
        <Headline as="h1" className="mt-5 text-4xl text-ink sm:text-5xl">
          Find My Bottleneck
        </Headline>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Five questions. We name the constraint that is actually holding everything else
          up, and one thing you can do about it this week. No email required.
        </p>

        <div className="mt-12">
          {loading && (
            <div className="card p-12 text-center" aria-live="polite">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-line border-t-accent" />
              <p className="mt-6 text-[0.9375rem] text-ink">Reading your answers</p>
              <p className="mono mt-2 text-muted">About 10 seconds</p>
            </div>
          )}

          {!loading && result && (
            <div aria-live="polite">
              <div className="card p-8 sm:p-10">
                <span className="mono text-accent">Your bottleneck</span>
                <div className="mt-5 space-y-4">
                  {result
                    .split(/\n\n+/)
                    .filter((p) => p.trim())
                    .map((p, i) => (
                      <p key={i} className="text-lg leading-relaxed text-ink">
                        {p}
                      </p>
                    ))}
                </div>
              </div>

              <div className="mt-4 rounded-[20px] bg-ink p-8 text-white sm:p-10">
                <h2
                  className="text-2xl text-white sm:text-3xl"
                  style={{ fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}
                >
                  Want help clearing it<span className="period">?</span>
                </h2>
                <p className="mt-4 leading-relaxed text-muted-dark">
                  Thirty minutes on the phone and we will tell you whether this is a fix you
                  can run yourself or one worth handing over.
                </p>
                <BookingLink className="mt-7">Book a fit call</BookingLink>
              </div>

              <div className="pt-8 text-center">
                <button
                  type="button"
                  onClick={reset}
                  className="mono text-muted transition-colors hover:text-ink"
                >
                  &larr; Start over
                </button>
              </div>
            </div>
          )}

          {!loading && !result && (
            <div className="card p-7 sm:p-10">
              <div className="flex items-center gap-4">
                <span className="mono whitespace-nowrap text-muted">
                  {String(step + 1).padStart(2, '0')} /{' '}
                  {String(QUESTIONS.length).padStart(2, '0')}
                </span>
                <div
                  className="relative h-px flex-1 overflow-hidden bg-line"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Bottleneck finder progress"
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-accent transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <h2
                className="mt-8 text-2xl text-ink sm:text-[1.75rem]"
                style={{ fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.2 }}
              >
                {question.q}
              </h2>

              <div className="mt-7 space-y-2.5">
                {question.opts.map((opt, i) => {
                  const isSelected = selected === i
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelected(i)}
                      aria-pressed={isSelected}
                      className={`flex w-full items-center gap-3 rounded-[14px] border px-5 py-4 text-left text-[0.9375rem] transition-colors ${
                        isSelected
                          ? 'border-accent bg-accent/5 text-ink'
                          : 'border-line bg-white text-muted hover:border-ink hover:text-ink'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${
                          isSelected ? 'border-accent bg-accent' : 'border-line'
                        }`}
                      >
                        {isSelected && <span className="h-1.5 w-1.5 rounded-[1px] bg-white" />}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 flex justify-end border-t border-line pt-6">
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={selected === null}
                  className="btn btn-accent"
                >
                  {isLast ? 'Get my diagnosis' : 'Next'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
