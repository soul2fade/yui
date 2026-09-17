import { BookingLink, Headline } from './ui'
import { EMAIL } from '../site'

export default function ClosingCTA() {
  return (
    <section id="contact" className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-28">
        <Headline as="h2" className="text-5xl text-white sm:text-6xl">
          You&rsquo;re up
        </Headline>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-dark">
          Thirty minutes, no pitch deck. Tell us what keeps breaking and we will tell you
          whether we can fix it — and what it would take.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <BookingLink>Book a fit call</BookingLink>
          <a href={`mailto:${EMAIL}`} className="btn btn-outline">
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  )
}
