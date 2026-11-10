import { BookingLink, Eyebrow, Headline } from './ui'
import { BOOKING_HREF, EMAIL, REMOTE_ASSESSMENT_HREF } from '../site'

const TIERS = [
  {
    name: 'Ops Assessment',
    price: '$1,500',
    cadence: 'one day, on-site or remote',
    secondary: 'First call is free',
    body: 'A full day inside your operation. We find where time, margin, and capacity are leaking, and leave you a ranked plan to fix it.',
    points: [
      'A full day on-site with your operations manager',
      'Where your time and money actually go',
      'A software audit: duplicate seats, overlapping tools, and shelfware to retire',
      'A ranked to-do list you can work through yourself',
      'The full $1,500 counts toward your first month if you sign on within two weeks of your results',
    ],
  },
  {
    name: 'Workflow Sprint',
    // A starting price: the quote is fixed before work starts. Same "+" format as
    // Growth so the price row stays on one line.
    price: '$3,500+',
    cadence: 'one-time',
    secondary: 'Starting price · fixed before we start',
    body: 'Pick the one bottleneck eating your week. We fix the process first, then build the system that runs it.',
    // The first point is the scope of one Sprint. Essential and Growth reuse it, so
    // change all three cards together if the system limit changes.
    // The last point is build management. Its terms (what it covers, the reply
    // time) live in the FAQ; change both together.
    points: [
      'One process, connecting up to 2 of the systems you already use',
      'For example: a new inquiry becomes a scheduled job; a closed job sends its invoice; vendor bills land in QuickBooks matched to the PO',
      'Scope signed off in week one, working by week four',
      'More than 2 systems? We split it into phases and price each one before we start',
      'A 1-hour handoff with the person on your team who’ll own it',
      'Written instructions, so you never depend on us',
      'Fixes for 30 days after launch',
      'After that, run it yourself, or we’ll keep it running for $500 a month',
    ],
  },
  {
    name: 'Ops Essential',
    price: '$5,000',
    cadence: 'per month',
    secondary: '1 Workflow Sprint at a time',
    badge: 'Recommended',
    body: 'One Workflow Sprint always in progress, and a monthly check that your numbers agree across systems.',
    points: [
      // Fixed price, so the limits are written here. Past them is Growth (see the
      // footnote under the cards).
      'One Workflow Sprint in progress at a time: one process, up to 2 systems, one location',
      'A 30-minute priorities meeting every other week',
      'A monthly numbers review: whether your job, billing, and payroll numbers match across systems, and what to fix where they don’t',
      'Clean numbers all year, ready for your CPA at year-end and your workers’ comp audit',
      // Dollars come from the client's own pay rates, never an estimate.
      'A monthly report: what we built, how often it ran, and the hours and dollars it’s saved since you joined',
      'Every 3 months: your next 3 builds, ranked by what each one saves',
      'Everything we build for you kept running while you’re on the plan',
    ],
  },
  {
    name: 'Ops Growth',
    // "Starting at" lives in the secondary row, not the price row: the full phrase
    // at price size would wrap on a 4-column desktop row and push this card's
    // price out of line with the others.
    price: '$10,000+',
    cadence: 'per month',
    secondary: 'Starting price · 2 Sprints at a time*',
    body: 'Two builds at once plus hands-on operations leadership, priced to your locations, systems, and team.',
    points: [
      'Everything in Essential, with a weekly 45-minute priorities meeting',
      'Two Workflow Sprints in progress at a time',
      'Builds across more than 2 systems or several locations, scoped in your Statement of Work',
      'Team training when each build goes live',
      'A quarterly software and vendor review: duplicate seats, overlapping tools, and renewals coming due',
      'Margin by service line each month, from your job and payroll numbers',
      'A delegation plan: which decisions come off your plate, who takes them, and by when',
    ],
  },
]

// The remote assessment runs the same day as the on-site one, over video. These
// times must match the Cal.com event (435 minutes from 9:00) and its
// "Assessment Days" schedule.
const REMOTE_DAY = [
  {
    time: 'Before the day',
    what: 'View-only access',
    detail: 'You grant read access to the systems you want reviewed. Nothing gets changed.',
  },
  {
    time: '9:00 to 9:45',
    what: 'Owner alignment',
    detail: 'Your priorities and where you think time and money are leaking.',
  },
  {
    time: '10:00 to 12:00',
    what: 'Live walkthrough',
    detail:
      'Your team shares their screen while doing real job entry, invoicing and dispatch. We watch, we don’t interrupt.',
  },
  { time: '12:00 to 1:00', what: 'Lunch', detail: 'Cameras off.' },
  {
    time: '1:00 to 3:00',
    what: 'Software review',
    detail:
      'Settings, duplicate seats, broken exports, and steps done twice. Your team only joins if we have questions.',
  },
  {
    time: '3:30 to 4:15',
    what: 'Findings briefing',
    detail: 'The top 3 fixes we found, before we sign off.',
  },
]

// On-site vs remote monthly plans. Framed as two equal ways to work: what is
// shared comes first, then each mode is described by what it includes, never by
// what it lacks. Keep the Sprint counts and meeting cadence in step with TIERS.
const INCLUDED_EITHER_WAY = [
  'Same monthly price',
  '1 Workflow Sprint at a time on Essential, 2 on Growth',
  'A priorities meeting every other week on Essential, weekly on Growth',
  'The same reports on what we built and what it saved',
]

const WORK_MODES = [
  {
    name: 'On-site (Sacramento area)',
    points: [
      'We work inside your operation, at your location',
      'Site visits whenever a Sprint needs eyes on the work',
    ],
  },
  {
    name: 'Remote',
    points: [
      'Reserved working time with us every week, booked when it suits your team',
      'Priorities meetings over video, so nothing waits for a drive',
    ],
  },
]

function Bullets({ items }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.9375rem] text-ink">
          <span
            aria-hidden="true"
            className="mt-[0.45rem] block shrink-0 bg-accent"
            style={{ width: 7, height: 7, borderRadius: 2 }}
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

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
          cancel. Your monthly rate stays locked for as long as you stay on the same plan.
          Need more locations or systems than Essential covers? That’s Growth. *Growth
          starts at $10,000 a month and is priced in your Statement of Work, based on your
          locations, systems, and team size.
        </p>

        <div id="remote-assessment" className="card mt-5 p-7 sm:p-8">
          {/* Solid pill, larger than the standard eyebrow, so remote visitors spot
              it while scanning the pricing section. */}
          <span
            className="mono inline-block rounded-full bg-accent px-3.5 py-1.5 text-white"
            style={{ fontSize: 13 }}
          >
            Prefer remote?
          </span>
          <h3
            className="mt-3 text-2xl text-ink"
            style={{ fontWeight: 600, letterSpacing: '-0.02em' }}
          >
            Same assessment, over video
          </h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            If a site visit doesn’t fit your schedule or your location, we run the same
            one-day Ops Assessment online. One booking, one day, same report, same $1,500,
            credited in full to your first month if you start a monthly plan within two
            weeks of your results.
          </p>
          <dl className="mt-6 divide-y divide-line border-y border-line">
            {REMOTE_DAY.map((row) => (
              <div
                key={row.time}
                className="grid gap-1 py-4 sm:grid-cols-[9rem_11rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
              >
                <dt className="mono text-muted">{row.time}</dt>
                <dd className="text-ink" style={{ fontWeight: 600 }}>
                  {row.what}
                </dd>
                <dd className="text-muted">{row.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-muted">
            Written report within 3 business days, then a results meeting online. Paid when
            you book.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={REMOTE_ASSESSMENT_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent shrink-0"
            >
              Book a remote assessment
            </a>
            <p className="text-sm text-muted">
              Not sure yet?{' '}
              <a
                href={BOOKING_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline underline-offset-4"
              >
                Book a fit call
              </a>{' '}
              first.
            </p>
          </div>
        </div>

        <div id="remote-plans" className="card mt-5 p-7 sm:p-8">
          <span className="mono text-accent">On-site or remote</span>
          <h3
            className="mt-3 text-2xl text-ink"
            style={{ fontWeight: 600, letterSpacing: '-0.02em' }}
          >
            Two ways to work with us. One price.
          </h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            We’re based in Sacramento and work on-site across the area. Further out, we
            run the same plans remotely. The Workflow Sprints, the priorities meetings, and
            the reporting don’t change. What changes is where we work, not what you get.
          </p>
          <div className="mt-6 border-t border-line pt-6">
            <h4 className="mono text-muted">Included either way</h4>
            <Bullets items={INCLUDED_EITHER_WAY} />
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {WORK_MODES.map((mode) => (
              <div key={mode.name} className="rounded-xl border border-line p-6">
                <h4 className="text-ink" style={{ fontWeight: 600 }}>
                  {mode.name}
                </h4>
                <Bullets items={mode.points} />
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted">
            Everything you get is written into your Statement of Work before you start.
          </p>
        </div>

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
              <dd className="text-ink">$5,000/mo</dd>
              <dd className="text-muted">
                One build always in progress plus a monthly numbers review. No payroll tax,
                no benefits, month to month.
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
