import { BookingLink, Eyebrow, Headline } from './ui'
import { EMAIL } from '../site'

const TIERS = [
  {
    name: 'Ops Assessment',
    price: '$1,500',
    cadence: 'one day, on-site',
    secondary: 'First call is free',
    body: 'A full day inside your operation. We find where time, margin, and capacity are leaking, and leave you a ranked plan to fix it.',
    points: [
      'A full day on-site with your operations manager',
      'Where your time and money actually go',
      'A software audit: duplicate seats, overlapping tools, and shelfware to retire',
      'A ranked to-do list you can work through yourself',
      'The full $1,500 counts toward your first month if you sign on',
    ],
  },
  {
    name: 'Workflow Sprint',
    price: '$3,500',
    cadence: 'one-time',
    body: 'Pick the one bottleneck eating your week. We fix the process first, then build the system that runs it.',
    points: [
      'Planned in week one, working by week four',
      'Repetitive admin taken off your team: reporting, billing reminders, lead intake',
      'Connected systems: one dashboard for multiple platforms',
      'Built on the tools you already own',
      'We show your team how to use it',
      'Written instructions, so you never depend on us',
    ],
  },
  {
    name: 'Ops Essential',
    price: '$4,000',
    cadence: 'per month',
    secondary: '1 Active Ops Sprint*',
    body: 'A steady hand on operations. Clear processes, smoother handoffs, and one improvement always in progress.',
    points: [
      'A weekly operations meeting to set priorities and clear what’s stuck',
      'One ops sprint in progress at a time',
      'Clear handoffs between teams, so work never stalls',
      'SOPs your team can follow without you stepping in',
      'Clear roles: who owns what, written down for every seat',
      'A simple scorecard that shows trouble early: at-risk clients, stalled deals, late jobs',
      'A monthly report on what we built and the hours it saved',
    ],
  },
  {
    name: 'Ops Growth',
    price: '$8,000',
    cadence: 'per month',
    secondary: '2 Active Ops Sprints*',
    badge: 'Best value',
    body: 'Hands-on operations help for a business growing fast.',
    points: [
      'Everything in Essential',
      'Two ops sprints in progress at a time',
      'Vendor, contractor, and OpEx optimization to protect EBITDA',
      'Automated workflows for your frontline team, with monthly training',
      'A delegation plan to get you out of the day-to-day',
      'Predictive capacity modeling & gross margin defense per service line as volume scales',
      'A quarterly report on what we did, next quarter’s plan, and a process review',
    ],
  },
]

// Sacramento-Roseville-Folsom metro medians, BLS OEWS May 2025, checked on
// 2026-10-26 in the BLS OEWS query system (data.bls.gov/oes, area 0040900).
// Medians, not means, because they are the conservative number. Update each
// spring when BLS publishes the next May release.
const HIRE_COSTS = [
  {
    option: 'Hire an ops manager',
    cost: '$118,460',
    note: 'One person, still depending on staff or vendors to build anything',
  },
  {
    option: 'Hire an office supervisor',
    cost: '$77,350',
    note: 'More management capacity, but the manual steps stay manual',
  },
  {
    option: 'Hire another admin',
    cost: '$55,020',
    note: 'More payroll, and the broken process stays broken',
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

        <p className="mt-5 text-sm text-muted">
          Both monthly plans are a month-to-month subscription, with 30 days’ notice to
          cancel. *Up to 5 ops sprints per quarter on Essential, and up to 10 on Growth.
        </p>


        <div className="card mt-5 p-7 sm:p-8">
          <span className="mono text-accent">What the alternative costs in Sacramento</span>
          <dl className="mt-5 divide-y divide-line border-y border-line">
            {HIRE_COSTS.map((row) => (
              <div
                key={row.option}
                className="grid gap-1 py-4 sm:grid-cols-[14rem_9rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
              >
                <dt className="text-ink" style={{ fontWeight: 600 }}>
                  {row.option}
                </dt>
                <dd className="text-ink">{`${row.cost}/yr`}</dd>
                <dd className="text-muted">{row.note}</dd>
              </div>
            ))}
            <div className="grid gap-1 py-4 sm:grid-cols-[14rem_9rem_minmax(0,1fr)] sm:items-baseline sm:gap-6">
              <dt className="text-accent" style={{ fontWeight: 600 }}>
                Ops Essential
              </dt>
              <dd className="text-ink">$4,000/mo</dd>
              <dd className="text-muted">
                Senior ops leadership plus hands-on builds. No payroll tax, no benefits,
                month to month.
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-muted">
            Salaries are median base pay before benefits, Sacramento-Roseville-Folsom metro,
            U.S. Bureau of Labor Statistics (OEWS, May 2025). Nationally, benefits add about
            30% on top of wages for private employers (BLS, June 2026).
          </p>
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
