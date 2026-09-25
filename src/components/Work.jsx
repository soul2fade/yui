import { Link } from 'react-router-dom'
import { Eyebrow, Headline } from './ui'

// Screenshots are captured from the live demos at 1200x800.
const PROJECTS = [
  {
    kicker: 'Demo',
    name: 'Budget Stress Test',
    body:
      'Sixteen budget lines, each with a probability of blowing past plan and by how much. It shows the expected shortfall before the year starts, and whether the contingency actually covers it. The real one stress tested the athletics budget at William Jessup University. This demo runs invented numbers for a fictional contractor.',
    facts: ['Probability-weighted, not a best guess', 'Ranks lines by expected loss', 'Shows the gap before it happens'],
    image: '/work/budget-stress-test.png',
    alt: 'The Budget Stress Test dashboard showing sixteen budget categories ranked by expected loss, with base, moderate and severe scenarios.',
    linkHref: 'https://budget-stress-test.netlify.app',
    linkLabel: 'Open the demo',
  },
  {
    kicker: 'Demo',
    name: 'Automated Invoicing',
    body:
      'A tech types what they finished in plain language. It comes back as a customer-ready invoice with line items and pricing, without anyone opening a template. Demo build, running sample jobs.',
    facts: ['Plain text in, invoice out', 'Built for trades work', 'No double entry'],
    image: '/work/automated-invoice.png',
    alt: 'The automated invoice generator showing a plain-language description of finished work converted into a formatted customer invoice.',
    linkHref: 'https://automatedinvoicedemo.netlify.app',
    linkLabel: 'Open the demo',
  },
]

const LINK_CLASS =
  'mt-7 self-start text-[0.9375rem] text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent'

// react-router's Link cannot navigate off-site, so an absolute URL has to render
// as a plain anchor. Same split as ButtonLink in ui.jsx.
function ProjectLink({ href, children }) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
        {children}
      </a>
    )
  }
  return (
    <Link to={href} className={LINK_CLASS}>
      {children}
    </Link>
  )
}

export default function Work() {
  return (
    <section id="work" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <Eyebrow>The work</Eyebrow>
        <Headline as="h2" className="mt-5 max-w-2xl text-4xl text-ink sm:text-5xl">
          Things we have actually shipped
        </Headline>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">
          Demo versions running sample data. Open either one and click around.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <article key={project.name} className="card flex flex-col overflow-hidden">
              <img
                src={project.image}
                alt={project.alt}
                width="1200"
                height="800"
                loading="lazy"
                className="aspect-[3/2] w-full border-b border-line object-cover"
              />
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <span className="mono text-accent">{project.kicker}</span>
                <h3
                  className="mt-4 text-2xl text-ink"
                  style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
                >
                  {project.name}
                </h3>
                {/* flex-1 pushes the divider to a common line, so the two cards
                    stay aligned even though the body copy differs in length. */}
                <p className="mt-3.5 flex-1 leading-relaxed text-muted">{project.body}</p>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                  {project.facts.map((fact) => (
                    <li key={fact} className="mono text-muted">
                      {fact}
                    </li>
                  ))}
                </ul>
                <ProjectLink href={project.linkHref}>
                  {project.linkLabel} &rarr;
                </ProjectLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
