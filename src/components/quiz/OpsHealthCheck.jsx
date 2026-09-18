import { useState } from 'react'
import { BookingLink, Eyebrow, Headline } from '../ui'
import { EMAIL } from '../../site'

// Ten-question Operations Health Check. The answers are scored server-side by
// the `audit` Netlify function, which keeps the API key off the client.
const QUESTIONS = [
  {
    id: 'revenue',
    label: 'What is your approximate annual revenue?',
    type: 'choice',
    options: ['Under $500k', '$500k to $1M', '$1M to $3M', '$3M to $10M', 'Over $10M'],
  },
  {
    id: 'team_size',
    label: 'How many people are on your team (including you)?',
    type: 'choice',
    options: ['1 to 5', '6 to 15', '16 to 50', '51 to 150', '150 or more'],
  },
  {
    id: 'scheduling',
    label: 'How do you schedule work and people today?',
    type: 'choice',
    options: [
      'Whiteboard, paper, or in my head',
      'Excel or Google Sheets',
      'Phone calls and group texts',
      'Dedicated scheduling software',
      'One integrated platform everyone uses',
    ],
  },
  {
    id: 'invoicing',
    label: 'How do you create and send invoices?',
    type: 'choice',
    options: [
      'Handwritten or Word documents',
      'Excel / Google Sheets',
      'QuickBooks or similar accounting software',
      'Software that generates them automatically',
    ],
  },
  {
    id: 'job_tracking',
    label: 'How do you track work in progress in real time?',
    type: 'choice',
    options: [
      'I call or text the team to check in',
      'A spreadsheet updated at the end of the day',
      'Software, but the updates lag behind reality',
      'Real-time software updated by the team as they go',
    ],
  },
  {
    id: 'invoice_lateness',
    label: 'How often do invoices get paid late?',
    type: 'choice',
    options: [
      'Rarely, most customers pay on time',
      'Sometimes, a handful each month',
      'Often, late payments are a constant problem',
      'Most invoices. Chasing payment is part of the job',
    ],
  },
  {
    id: 'admin_hours',
    label: 'How many hours a week do you personally spend on admin and paperwork?',
    type: 'choice',
    options: ['Under 5 hours', '5 to 10 hours', '10 to 20 hours', 'Over 20 hours'],
  },
  {
    id: 'profit_visibility',
    label: 'Do you know your actual margin per job or per customer?',
    type: 'choice',
    options: [
      'No, I only see the overall picture at year-end',
      'A rough estimate based on gut feel',
      'I calculate it manually after the fact',
      'Yes, it is tracked automatically',
    ],
  },
  {
    id: 'communication',
    label: 'How do you manage customer communication?',
    type: 'choice',
    options: [
      'Personal phone and text messages',
      'A shared inbox or spreadsheet',
      'A CRM or service platform',
    ],
  },
  {
    id: 'bottleneck',
    label: 'What is the one thing that eats your time every week?',
    type: 'text',
    placeholder: 'In a sentence or two…',
  },
]

const INTRO = -1
const LOADING = QUESTIONS.length
const RESULTS = QUESTIONS.length + 1

function buildLabeledAnswers(raw) {
  const out = {}
  for (const q of QUESTIONS) {
    out[q.label] = raw[q.id] || '(no answer)'
  }
  return out
}

export default function OpsHealthCheck() {
  const [step, setStep] = useState(INTRO)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const current = QUESTIONS[step]
  const progress =
    step >= 0 && step < QUESTIONS.length ? Math.round((step / QUESTIONS.length) * 100) : 0

  const handleAnswer = (value) => setAnswers({ ...answers, [current.id]: value })

  const handleNext = async () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
      return
    }

    setStep(LOADING)
    setError(null)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: buildLabeledAnswers(answers) }),
        signal: controller.signal,
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }))
        throw new Error(
          err.detail ? `${err.error} (${err.detail})` : err.error || 'Request failed'
        )
      }
      setResult(await res.json())
      setStep(RESULTS)
    } catch (e) {
      setError(
        e.name === 'AbortError'
          ? `This is taking longer than expected. Try again, or email ${EMAIL}.`
          : e.message || 'Something went wrong'
      )
      setStep(QUESTIONS.length - 1)
    } finally {
      clearTimeout(timeoutId)
    }
  }

  const handleReset = () => {
    setAnswers({})
    setResult(null)
    setError(null)
    setStep(INTRO)
  }

  const currentAnswer = current ? answers[current.id] : null
  const canProceed =
    current?.type === 'text' ? (currentAnswer || '').trim().length > 0 : !!currentAnswer

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:px-8 sm:py-24">
        <Eyebrow>Free diagnostic</Eyebrow>
        <Headline as="h1" className="mt-5 text-4xl text-ink sm:text-5xl">
          Operations Health Check
        </Headline>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Ten questions about how your business runs today. You get an operations score,
          the hours a week you are losing, and the gaps causing it. No email required.
        </p>

        <div className="mt-12">
          {step === INTRO && <IntroCard onStart={() => setStep(0)} />}

          {step >= 0 && step < QUESTIONS.length && (
            <QuestionCard
              question={current}
              answer={currentAnswer}
              onAnswer={handleAnswer}
              onBack={step > 0 ? () => setStep(step - 1) : null}
              onNext={handleNext}
              canProceed={canProceed}
              progress={progress}
              stepIndex={step}
              isLast={step === QUESTIONS.length - 1}
              error={error}
            />
          )}

          {step === LOADING && <LoadingCard />}

          {step === RESULTS && result && <ResultsCard result={result} onReset={handleReset} />}
        </div>
      </div>
    </section>
  )
}

function IntroCard({ onStart }) {
  return (
    <div className="card p-8 sm:p-10">
      <span className="mono text-accent">10 questions · About 2 minutes</span>
      <h2
        className="mt-5 text-2xl text-ink sm:text-3xl"
        style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
      >
        See where your operations stand
      </h2>
      <p className="mt-4 leading-relaxed text-muted">
        Answer honestly. The score is only useful if the inputs are. Results come back in
        about ten seconds.
      </p>
      <button type="button" onClick={onStart} className="btn btn-accent mt-8">
        Start the health check
      </button>
    </div>
  )
}

function QuestionCard({
  question,
  answer,
  onAnswer,
  onBack,
  onNext,
  canProceed,
  progress,
  stepIndex,
  isLast,
  error,
}) {
  return (
    <div className="card p-7 sm:p-10">
      <div className="flex items-center gap-4">
        <span className="mono whitespace-nowrap text-muted">
          {String(stepIndex + 1).padStart(2, '0')} / {String(QUESTIONS.length).padStart(2, '0')}
        </span>
        <div
          className="relative h-px flex-1 overflow-hidden bg-line"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Health check progress"
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
        {question.label}
      </h2>

      {question.type === 'choice' && (
        <div className="mt-7 space-y-2.5">
          {question.options.map((opt) => {
            const selected = answer === opt
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onAnswer(opt)}
                aria-pressed={selected}
                className={`flex w-full items-center gap-3 rounded-[14px] border px-5 py-4 text-left text-[0.9375rem] transition-colors ${
                  selected
                    ? 'border-accent bg-accent/5 text-ink'
                    : 'border-line bg-white text-muted hover:border-ink hover:text-ink'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${
                    selected ? 'border-accent bg-accent' : 'border-line'
                  }`}
                >
                  {selected && <span className="h-1.5 w-1.5 rounded-[1px] bg-white" />}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            )
          })}
        </div>
      )}

      {question.type === 'text' && (
        <label className="mt-7 block">
          <span className="sr-only">{question.label}</span>
          <textarea
            value={answer || ''}
            onChange={(e) => onAnswer(e.target.value)}
            placeholder={question.placeholder}
            rows={4}
            className="w-full resize-none rounded-[14px] border border-line bg-white px-4 py-3.5 text-[0.9375rem] text-ink placeholder:text-muted-dark focus:border-accent focus:outline-none"
          />
        </label>
      )}

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-[14px] border border-accent/40 bg-accent/5 p-4 text-[0.9375rem] text-ink"
        >
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-6">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="text-[0.9375rem] text-muted transition-colors hover:text-ink"
          >
            &larr; Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="btn btn-accent"
        >
          {isLast ? 'See my score' : 'Next'}
        </button>
      </div>
    </div>
  )
}

function LoadingCard() {
  return (
    <div className="card p-12 text-center" aria-live="polite">
      <div className="mx-auto h-9 w-9">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-line border-t-accent" />
      </div>
      <p className="mt-6 text-[0.9375rem] text-ink">Reading your answers</p>
      <p className="mono mt-2 text-muted">About 10 seconds</p>
    </div>
  )
}

function ResultsCard({ result, onReset }) {
  const { score, estimated_hours_lost_per_week, critical_gaps, diagnosis } = result
  const severity = score >= 70 ? 'Healthy' : score >= 45 ? 'At risk' : 'Critical'

  return (
    <div className="space-y-4" aria-live="polite">
      <div className="card p-8 sm:p-10">
        <div className="flex items-baseline justify-between gap-4">
          <span className="mono text-muted">Result</span>
          <span className="mono text-accent">{severity}</span>
        </div>

        <div className="mt-8 flex items-end gap-3">
          <span
            className="text-7xl text-ink sm:text-8xl"
            style={{ fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1 }}
          >
            {score}
          </span>
          <span className="mb-2 text-2xl text-muted">/100</span>
        </div>
        <p className="mono mt-3 text-muted">Operations score</p>

        <div className="mt-8 grid grid-cols-2 gap-8 border-t border-line pt-8">
          <div>
            <div
              className="text-3xl text-ink"
              style={{ fontWeight: 600, letterSpacing: '-0.04em' }}
            >
              ~{estimated_hours_lost_per_week}
              <span className="ml-1 text-lg text-muted">hrs/wk</span>
            </div>
            <p className="mono mt-2 text-muted">Lost to manual work</p>
          </div>
          <div>
            <div
              className="text-3xl text-ink"
              style={{ fontWeight: 600, letterSpacing: '-0.04em' }}
            >
              {critical_gaps.length}
            </div>
            <p className="mono mt-2 text-muted">Critical gaps</p>
          </div>
        </div>
      </div>

      <div className="card p-8 sm:p-10">
        <span className="mono text-accent">Diagnosis</span>
        <p className="mt-5 text-lg leading-relaxed text-ink">{diagnosis}</p>
      </div>

      <div className="card p-8 sm:p-10">
        <span className="mono text-accent">Critical gaps</span>
        <ul className="mt-5 divide-y divide-line">
          {critical_gaps.map((gap, i) => (
            <li key={gap} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
              <span className="mono w-6 text-muted">{String(i + 1).padStart(2, '0')}</span>
              <span className="flex-1 text-[0.9375rem] text-ink">{gap}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[20px] bg-ink p-8 text-white sm:p-10">
        <h2
          className="text-2xl text-white sm:text-3xl"
          style={{ fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}
        >
          Want to see what fixing these looks like<span className="period">?</span>
        </h2>
        <p className="mt-4 leading-relaxed text-muted-dark">
          Book a fit call. We will walk through your gaps and tell you what it takes to
          close them, or tell you honestly that you do not need us.
        </p>
        <BookingLink className="mt-7">Book a fit call</BookingLink>
      </div>

      <div className="pt-4 text-center">
        <button
          type="button"
          onClick={onReset}
          className="mono text-muted transition-colors hover:text-ink"
        >
          &larr; Retake the health check
        </button>
      </div>
    </div>
  )
}
