import { Link } from 'react-router-dom'
import { BookingLink, Eyebrow, Headline } from './ui'

const TAGS = ['Based in Sacramento', 'Any small business', 'Builds, not decks']

export default function Hero() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
        <Eyebrow tone="paper">AI integrations + ops management</Eyebrow>

        <Headline
          as="h1"
          className="mt-6 max-w-3xl text-[2.75rem] text-white sm:text-6xl lg:text-7xl"
        >
          The operator your business is missing
        </Headline>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-dark">
          We run the operations you do not have time for, and we put AI to work where it
          actually pays off. No dashboards nobody opens. No strategy decks. Systems that
          run your business when you are not looking at them.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <BookingLink>Book a fit call</BookingLink>
          <Link to="/#how-it-works" className="btn btn-outline">
            See how it works
          </Link>
        </div>

        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-7">
          {TAGS.map((tag) => (
            <li key={tag} className="mono text-muted-dark">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
