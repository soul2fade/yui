import { Link } from 'react-router-dom'
import { Eyebrow, Headline, Stat } from './ui'
import { STATS } from '../site'

// Voice note: the About section speaks as "I" — everywhere else on the site is "we".
export default function AboutSection() {
  return (
    <section id="about" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-16">
          <img
            src="/daniel.jpg"
            alt="Daniel, the founder of Yui, in a studio headshot."
            width="700"
            height="700"
            loading="lazy"
            className="aspect-square w-full max-w-xs rounded-[20px] border border-line object-cover"
          />

          <div>
            <Eyebrow>About</Eyebrow>
            <Headline as="h2" className="mt-5 max-w-xl text-4xl text-ink sm:text-5xl">
              I have run the operations, not just advised on them
            </Headline>

            <div className="mt-7 max-w-xl space-y-5 text-lg leading-relaxed text-muted">
              <p>
                I am Daniel. I have spent my career inside operations — managing $3.2B in
                assets at Folio Dynamix, running a youth soccer club of 900 players and 88
                teams, and cutting $2M of cost out of a university&rsquo;s back office. Different
                worlds, same job: figure out what is actually broken, then build the thing
                that fixes it.
              </p>
              <p>
                I started Yui because small businesses get the worst version of this help —
                consultants who leave a deck behind, or software nobody adopts. I would
                rather sit in your operation, build what it needs, and stay until it runs
                without me watching it.
              </p>
            </div>

            <ul className="mt-12 grid gap-5 sm:grid-cols-3">
              {STATS.map((stat) => (
                <li key={stat.figure}>
                  <Stat {...stat} />
                </li>
              ))}
            </ul>

            <Link
              to="/about"
              className="mt-10 inline-block text-[0.9375rem] text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              More about Daniel &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
