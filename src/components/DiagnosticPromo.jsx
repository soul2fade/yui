import { Link } from 'react-router-dom'
import { Eyebrow, Headline } from './ui'

const TOOLS = [
  {
    href: '/audit',
    name: 'Operations Health Check',
    body:
      'Ten questions about how the business runs today. You get an operations score, the hours a week you are losing to manual work, and the gaps that are causing it.',
    cta: 'Start the health check',
  },
  {
    href: '/bottleneck',
    name: 'Find My Bottleneck',
    body:
      'Five questions, and we name the one constraint holding everything else up, plus one concrete thing you can do about it this week.',
    cta: 'Find my bottleneck',
  },
]

export default function DiagnosticPromo() {
  return (
    <section id="diagnostics" className="border-b border-line bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <Eyebrow tone="paper">Free diagnostic</Eyebrow>
        <Headline as="h2" className="mt-5 max-w-2xl text-4xl text-white sm:text-5xl">
          Where is your operation bleeding
        </Headline>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {TOOLS.map((tool, i) => (
            <div key={tool.href} className="card-dark flex flex-col p-7 sm:p-8">
              <span className="mono text-muted-dark">
                Tool {String(i + 1).padStart(2, '0')}
              </span>
              <h3
                className="mt-4 text-2xl text-white"
                style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
              >
                {tool.name}
              </h3>
              <p className="mt-3.5 flex-1 leading-relaxed text-muted-dark">{tool.body}</p>
              <Link to={tool.href} className="btn btn-accent mt-7 self-start">
                {tool.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* This line describes both tools, so it cannot name one tool's length.
            The health check is ten questions and the bottleneck finder is five,
            and the counts are set in TOOLS above, so keep the range in step with
            them if either tool changes. */}
        <p className="mono mt-10 text-muted-dark">
          5 or 10 questions · No email required · About 2 minutes
        </p>
      </div>
    </section>
  )
}
