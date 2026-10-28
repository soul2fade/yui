import { Eyebrow, Headline, Stat } from './ui'

const CARDS = [
  {
    title: 'Tools that don\u2019t talk',
    body:
      'Scheduling, invoicing, payroll, and the books each live in a different system. Your team jumps between them, types the same information twice, and the numbers rarely match.',
  },
  {
    title: 'Steps that outlived their purpose',
    body:
      'Approvals, reports, and checklists that made sense a few years ago are still running. Nobody would add them today, but they still take up time every week.',
  },
  {
    title: 'Work sitting with the wrong person',
    body:
      'Managers and senior staff spend part of their week on admin that a system or a junior hire could handle, instead of the work you hired them for.',
  },
]

// Salesforce, Small and Medium Business Trends Report, 6th edition. Survey of
// 3,350 SMB leaders in 26 countries, Aug 3 to Sep 16, 2024; SMB defined as 200
// or fewer employees. Read in full from the report PDF on 2026-10-28:
// salesforce.com/en-us/wp-content/uploads/sites/4/documents/resources/smb-trends-report-6th-edition_Salesforce.pdf
// Quote the figures exactly as surveyed. They are not specific to Sacramento or
// to the $3M to $10M range.
const STATS = [
  {
    figure: '53%',
    label: 'of small and midsize business leaders say data is often inconsistent across their business tools.',
    detail: 'Salesforce, 2024',
  },
  {
    figure: '46%',
    label: 'feel overwhelmed by too many business tools.',
    detail: 'Salesforce, 2024',
  },
  {
    figure: '44%',
    label: 'say there isn\u2019t time to master all the technology their company uses.',
    detail: 'Salesforce, 2024',
  },
]

// Slack small business productivity survey, conducted online by Talker Research
// for Slack, June 28 to July 3, 2024. 2,000 U.S. small business owners; small
// business defined as 2,000 or fewer employees. Read in full on 2026-10-28:
// salesforce.com/news/stories/small-business-productivity-trends-2024/
// The 96 minutes covers all wasted time, including non-work distractions, so the
// copy never says tools cause all of it. The list below is only the tool-related
// reasons owners gave; "about 3 in 10" is the survey's own wording.
// "8 hours" is 96 minutes x 5 workdays. Slack's own "three weeks a year" counts
// 24-hour days (96 min x 365), so it is not used. Never present the 8 hours as
// time Yui saves: the survey does not split the minutes by cause.
const TIME_LOST = {
  figure: '96 min',
  label: 'Small business owners lose 96 minutes of productivity a day. Over a five-day week, that\u2019s 8 hours.',
}

const TOOL_REASONS = [
  { figure: '3 in 10', label: 'lose time searching for information in the wrong places' },
  { figure: '29%', label: 'repeat the same messages across platforms' },
  { figure: '28%', label: 'wait on status updates from multiple tools and people' },
  { figure: '17%', label: 'lose time switching between apps and tools' },
]

export default function Problem() {
  return (
    <section id="problem" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <Eyebrow>The problem</Eyebrow>
        <Headline as="h2" className="mt-5 max-w-2xl text-4xl text-ink sm:text-5xl">
          The busywork lives in the gaps
        </Headline>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          You have the software, the roles, and the processes. The busywork lives between
          them: tools that don&rsquo;t share information, steps that outlived their purpose,
          and work sitting with the wrong person.
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

        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {STATS.map((stat) => (
            <li key={stat.figure} className="*:h-full">
              <Stat {...stat} />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          Salesforce, Small and Medium Business Trends Report, 6th edition. Survey of 3,350
          leaders at companies with 200 or fewer employees, 2024.
        </p>

        <div className="card mt-10 grid gap-8 p-7 sm:p-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-center">
          <div>
            <div
              className="text-4xl text-ink sm:text-5xl"
              style={{ fontWeight: 600, letterSpacing: '-0.04em' }}
            >
              {TIME_LOST.figure}
            </div>
            <p className="mt-3 leading-snug text-ink">{TIME_LOST.label}</p>
          </div>
          <div>
            <p className="mono text-accent">Tool-related reasons owners gave</p>
            <ul className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {TOOL_REASONS.map((reason) => (
                <li key={reason.label} className="flex items-baseline gap-3">
                  <span
                    className="w-[4.75rem] shrink-0 text-xl text-ink"
                    style={{ fontWeight: 600, letterSpacing: '-0.02em' }}
                  >
                    {reason.figure}
                  </span>
                  <span className="leading-snug text-muted">{reason.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">
          Slack survey of 2,000 U.S. small business owners, conducted by Talker Research, 2024.
        </p>
      </div>
    </section>
  )
}
