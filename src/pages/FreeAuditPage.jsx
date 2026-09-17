import { Link } from 'react-router-dom'
import Meta from '../components/Meta'
import { Eyebrow, Headline } from '../components/ui'
import { BOOKING_HREF } from '../site'

const TOOLS = [
  {
    href: '/audit',
    name: 'Operations Health Check',
    length: '10 questions · ~2 minutes',
    body:
      'The broad one. Ten questions about revenue, team size, scheduling, invoicing, and where your own hours go. You get a score out of 100, an estimate of the hours a week you are losing, and the gaps behind them.',
    cta: 'Start the health check',
  },
  {
    href: '/bottleneck',
    name: 'Find My Bottleneck',
    length: '5 questions · ~1 minute',
    body:
      'The narrow one. Five questions, and we name the single constraint holding everything else up — plus one concrete step you can take this week without hiring anyone.',
    cta: 'Find my bottleneck',
  },
]

export default function FreeAuditPage() {
  return (
    <div data-testid="free-audit-page">
      <Meta
        title="Free audit — two self-serve operations diagnostics | Yui"
        description="Two free diagnostics for small business operations: a 10-question Operations Health Check and a 5-question bottleneck finder. No email required."
        path="/free-audit"
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8 sm:py-24">
          <Eyebrow>Free audit</Eyebrow>
          <Headline as="h1" className="mt-5 text-4xl text-ink sm:text-5xl">
            Two ways to find out what is costing you
          </Headline>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Both are free, both are self-serve, and neither asks for your email. Pick the
            one that matches how much you already know about the problem.
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {TOOLS.map((tool) => (
              <div key={tool.href} className="card flex flex-col p-7 sm:p-8">
                <span className="mono text-accent">{tool.length}</span>
                <h2
                  className="mt-4 text-2xl text-ink"
                  style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
                >
                  {tool.name}
                </h2>
                <p className="mt-3.5 flex-1 leading-relaxed text-muted">{tool.body}</p>
                <Link to={tool.href} className="btn btn-accent mt-7 self-start">
                  {tool.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="card mt-5 flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="max-w-xl leading-relaxed text-muted">
              Would rather just talk it through? A fit call is thirty minutes and we will
              tell you straight whether this is something we can help with.
            </p>
            <Link to={BOOKING_HREF} className="btn btn-outline-ink shrink-0">
              Book a fit call
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
