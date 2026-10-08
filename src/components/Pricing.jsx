import { BookingLink, Eyebrow, Headline } from './ui'
import { EMAIL } from '../site'

const TIERS = [
  {
    name: 'Ops + AI Assessment',
    price: '$1,500',
    cadence: 'one day, on-site',
    secondary: 'First call is free',
    body: 'A full day inside your operation. We find where time, margin, and capacity are leaking, and leave you a ranked plan to fix it.',
    points: [
      'Full-Day On-Site Operations Walkthrough',
      'Labor, Subcontractor & Software Spend Audit',
      'Sale-to-Delivery Bottleneck Diagnosis',
      'Ranked 90-Day Execution Roadmap',
      'Full $1,500 Credited to Month One',
    ],
  },
  {
    name: 'AI + Workflow Sprint',
    price: '$3,500',
    cadence: 'one-time',
    body: 'Pick the one bottleneck eating your week. We fix the process first, then build the system that runs it.',
    points: [
      'Process Cleanup Before Automation',
      'Planned in Week 1, Live by Week 4',
      'Built on the Tools You Already Own',
      'Live Team Training & Written SOPs',
      'Zero Vendor Lock-In',
    ],
  },
  {
    name: 'Ops + AI Essential',
    price: '$4,000',
    cadence: 'per month',
    secondary: '1 Active Ops Sprint',
    body: 'Ongoing operations leadership. We set the weekly rhythm, write down how work gets done, and keep the core running.',
    points: [
      'Weekly Leadership Cadence & KPI Tracking',
      'Documented Handoffs & SOPs',
      'Up to 5 Ops Sprints per Quarter',
      'Weekly Operations Scorecard',
      'Monthly Impact & Hours-Recovered Report',
      'Month-to-Month, 30 Days’ Notice to Cancel',
    ],
  },
  {
    name: 'Ops + AI Growth',
    price: '$8,000',
    cadence: 'per month',
    secondary: '2 Active Ops Sprints',
    badge: 'Best value',
    body: 'Hands-on operations leadership for a business growing fast. Every team accountable, and margins protected as volume climbs.',
    points: [
      'Everything in Essential, Plus:',
      'Sales, Operations & Billing Alignment',
      'Capacity & Margin Protection per Service Line',
      '60 to 90 Day Hiring & Capacity Forecast',
      'Up to 10 Ops Sprints per Quarter',
      'Monthly AI & Systems Team Training',
      'Quarterly Operations Review & Software Audit',
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <Eyebrow>Pricing</Eyebrow>
        <Headline as="h2" className="mt-5 max-w-2xl text-4xl text-ink sm:text-5xl">
          Plain numbers, no surprises
        </Headline>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Start with an assessment or go straight to a build. The monthly plans are month
          to month. We would rather earn them than lock you in.
        </p>

        {/* Subgrid puts every card's label, title, price, team price, body, list and
            button on shared row tracks, so the prices line up across a row even
            when a title wraps or only one card has a team price. */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`card flex flex-col p-7 sm:grid sm:grid-rows-subgrid sm:row-span-7 sm:gap-y-0 ${tier.badge ? 'ring-1 ring-accent' : ''}`}
            >
              <div className="flex min-h-6 items-start justify-between gap-2">
                <span className="mono text-muted">{tier.cadence}</span>
                {tier.badge && (
                  <span className="mono rounded-full bg-accent px-2.5 py-1 text-white">
                    {tier.badge}
                  </span>
                )}
              </div>
              <h3
                className="mt-5 text-xl text-ink"
                style={{ fontWeight: 600, letterSpacing: '-0.02em' }}
              >
                {tier.name}
              </h3>
              <div
                className="mt-4 text-4xl text-ink"
                style={{ fontWeight: 600, letterSpacing: '-0.04em' }}
              >
                {tier.price}
              </div>
              {/* Always rendered so every card keeps the same row count for the subgrid. */}
              <p className="mono mt-2 text-accent" aria-hidden={tier.secondary ? undefined : true}>
                {tier.secondary}
              </p>
              <p className="mt-4 leading-relaxed text-muted">{tier.body}</p>
              <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6">
                {tier.points.map((point) => (
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
              <BookingLink variant="outline-ink" className="mt-7">
                Book a fit call
              </BookingLink>
            </div>
          ))}
        </div>

        <div className="card mt-5 flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <span className="mono text-accent">Custom engagements</span>
            <p className="mt-3 max-w-xl leading-relaxed text-muted">
              Multi-location, a team to build alongside, or something that does not fit a
              tier? We scope those directly. Tell us what you are dealing with and we will
              tell you what it takes.
            </p>
          </div>
          <a href={`mailto:${EMAIL}`} className="btn btn-accent shrink-0">
            Email us
          </a>
        </div>
      </div>
    </section>
  )
}
