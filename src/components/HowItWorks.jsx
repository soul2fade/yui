import { Eyebrow, Headline } from './ui'

const STEPS = [
  {
    name: 'Fit call',
    detail: '30 minutes',
    body:
      'We ask what breaks most often and where your week goes. If we are not the right help, we say so on the call.',
  },
  {
    name: 'Game plan',
    detail: 'Week one',
    body:
      'You get the short list: what we fix first, what it costs you today, and what it looks like once it is running.',
  },
  {
    name: 'Build',
    detail: 'Weeks two to four',
    body:
      'We build the first working system and put it in front of your team. Working software, not a recommendation to go buy some.',
  },
  {
    name: 'Ongoing support',
    detail: 'Month to month',
    body:
      'We keep it running, keep improving it, and keep taking the next thing off your plate. Cancel whenever it stops earning its keep.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <Eyebrow>How it works</Eyebrow>
        <Headline as="h2" className="mt-5 max-w-2xl text-4xl text-ink sm:text-5xl">
          Four steps, no mystery
        </Headline>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.name} className="card p-7">
              <div className="flex items-baseline justify-between gap-3">
                <span className="mono text-accent">Step {String(i + 1).padStart(2, '0')}</span>
                <span className="mono text-muted">{step.detail}</span>
              </div>
              <h3
                className="mt-5 text-xl text-ink"
                style={{ fontWeight: 600, letterSpacing: '-0.02em' }}
              >
                {step.name}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
