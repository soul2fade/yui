import { Eyebrow, Headline } from './ui'

const CARDS = [
  {
    title: 'You are the front office',
    body:
      'You quote the job, you schedule it, you chase the invoice. The work that actually grows the business waits until everything else is done — which is never.',
  },
  {
    title: 'You are the back office',
    body:
      'Payroll, receivables, vendor follow-up, the thing that only you know how to do. None of it is written down, so none of it can be handed to anyone else.',
  },
  {
    title: 'You are the tech stack',
    body:
      'Six tools that do not talk to each other, held together by a spreadsheet and your memory. The same customer detail gets typed in three times a week.',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <Eyebrow>The problem</Eyebrow>
        <Headline as="h2" className="mt-5 max-w-2xl text-4xl text-ink sm:text-5xl">
          You&rsquo;re playing every position
        </Headline>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Small businesses do not fail because the owner is not working hard enough. They
          stall because one person is holding every function at once.
        </p>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {CARDS.map((card) => (
            <li key={card.title} className="card p-7">
              <h3 className="text-xl text-ink" style={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
                {card.title}
              </h3>
              <p className="mt-3.5 leading-relaxed text-muted">{card.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
