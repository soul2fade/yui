import { Link } from 'react-router-dom'
import { Eyebrow, Headline } from './ui'

// Both images are labeled placeholders — see public/ASSETS.md. The alt text is
// written for the final asset so it survives the swap.
const PROJECTS = [
  {
    kicker: 'Product',
    name: 'Missed-Call Rescue',
    body:
      'Every call a small business misses gets answered anyway: caller identified, reason captured, text sent back inside a minute, and the job written into the queue before anyone picks up a phone.',
    facts: ['Answers in under 60 seconds', 'Texts back automatically', 'Writes the lead into the queue'],
    image: '/placeholders/missed-call-rescue.svg',
    alt: 'The Missed-Call Rescue dashboard showing a missed call captured, the caller identified, and the automatic text reply that was sent back.',
    linkHref: '/contact',
    linkLabel: 'See it live',
  },
  {
    kicker: 'Client work',
    name: 'Sacramento Ballet',
    body:
      'We rebuilt how a working arts organization handles registration, scheduling, and the reporting that used to be assembled by hand every month.',
    facts: ['Registration and scheduling in one place', 'Monthly reporting automated', 'Staff hours returned to the season'],
    image: '/placeholders/sacramento-ballet.svg',
    alt: 'The Sacramento Ballet scheduling and registration screen rebuilt by Yui, showing classes, rosters, and enrollment status.',
    linkHref: '/#contact',
    linkLabel: 'Read the case study',
  },
]

export default function Work() {
  return (
    <section id="work" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <Eyebrow>The work</Eyebrow>
        <Headline as="h2" className="mt-5 max-w-2xl text-4xl text-ink sm:text-5xl">
          Things we have actually shipped
        </Headline>

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
                <p className="mt-3.5 leading-relaxed text-muted">{project.body}</p>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                  {project.facts.map((fact) => (
                    <li key={fact} className="mono text-muted">
                      {fact}
                    </li>
                  ))}
                </ul>
                <Link
                  to={project.linkHref}
                  className="mt-7 self-start text-[0.9375rem] text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {project.linkLabel} &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
