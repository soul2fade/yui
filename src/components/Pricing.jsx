import { Link } from 'react-router-dom'
import { Eyebrow, Headline } from './ui'
import { BOOKING_HREF, EMAIL } from '../site'

const TIERS = [
  {
    name: 'Ops + AI Assessment',
    price: '$495',
    cadence: 'solo operators',
    secondary: '$995 for teams',
    body: 'A fixed-scope look at how the business runs today and what to fix first.',
    points: [
      'Full review of your current operations',
      'Where the hours and the money are going',
      'A prioritized fix list you can run yourself',
      'Credited toward your first month if you continue',
    ],
  },
  {
    name: 'AI Implementation Sprint',
    price: '$3,500',
    cadence: 'one-time',
    body: 'One real system, built and running, start to finish.',
    points: [
      'Scoped in week one, live by week four',
      'Built on the tools you already own',
      'Your team trained on it',
      'Documentation and handover included',
    ],
  },
  {
    name: 'Ops + AI Essential',
    price: '$2,500',
    cadence: 'per month',
    body: 'Ongoing operations coverage for a business that needs the basics held.',
    points: [
      'Weekly operating cadence',
      'One build or improvement per month',
      'Processes documented as we go',
      'Month to month, cancel anytime',
    ],
  },
  {
    name: 'Ops + AI Growth',
    price: '$4,000',
    cadence: 'per month',
    badge: 'Most popular',
    body: 'The full operator seat for a business that is moving.',
    points: [
      'Everything in Essential',
      'Multiple builds in flight each month',
      'Direct line for the day-to-day calls',
      'Quarterly plan built and reviewed with you',
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
          to month — we would rather earn them than lock you in.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`card flex flex-col p-7 ${tier.badge ? 'ring-1 ring-accent' : ''}`}
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
              {tier.secondary && <p className="mono mt-2 text-accent">{tier.secondary}</p>}
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
              <Link to={BOOKING_HREF} className="btn btn-outline-ink mt-7">
                Book a fit call
              </Link>
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
