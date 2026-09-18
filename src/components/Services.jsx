import { Eyebrow, Headline } from './ui'

const SERVICES = [
  {
    name: 'AI integrations',
    body:
      'We put AI where it does real work: answering the calls you cannot get to, drafting the follow-up, reading the inbox, pulling the numbers you keep asking someone for. Connected to the tools you already pay for, not bolted on beside them.',
    points: ['Missed-call and inbox coverage', 'Quote and proposal drafting', 'Reporting that writes itself'],
  },
  {
    name: 'Operations management',
    body:
      'We take the operating work off your plate and run it on a cadence: scheduling, receivables, vendors, the weekly numbers. Your processes get written down once, so they stop living in one person’s head.',
    points: ['Weekly operating rhythm', 'Documented, handoff-ready processes', 'Vendor and receivables follow-through'],
  },
  {
    name: 'Automation builds',
    body:
      'The handoffs between your tools become automatic. Intake to job, job to invoice, invoice to paid, paid to the report you actually read. We build it, we maintain it, and we hand you the keys.',
    points: ['Intake to invoice, end to end', 'No more double entry', 'Built on tools you own'],
  },
]

export default function Services() {
  return (
    <section id="services" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <Eyebrow>What we do</Eyebrow>
        <Headline as="h2" className="mt-5 max-w-2xl text-4xl text-ink sm:text-5xl">
          Three ways we take work off your plate
        </Headline>

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <li key={service.name} className="card flex flex-col p-7 sm:p-8">
              <span className="mono text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3
                className="mt-4 text-2xl text-ink"
                style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
              >
                {service.name}
              </h3>
              <p className="mt-3.5 leading-relaxed text-muted">{service.body}</p>
              <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[0.9375rem] text-ink">
                    <span
                      aria-hidden="true"
                      className="mt-[0.45rem] block shrink-0 bg-accent"
                      style={{ width: 7, height: 7, borderRadius: 2 }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
