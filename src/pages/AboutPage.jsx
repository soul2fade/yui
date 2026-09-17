import Meta from '../components/Meta'
import { BookingLink, Eyebrow, Headline, Stat } from '../components/ui'
import { EMAIL, STATS } from '../site'

// Voice note: the About page speaks as "I" throughout. Every other page is "we".
export default function AboutPage() {
  return (
    <div data-testid="about-page">
      <Meta
        title="About — Daniel and the story behind Yui"
        description="Why Yui exists, what the name means, and the operations work behind it: $3.2B in assets at Folio Dynamix, 900 players at Greenhaven Soccer Club, $2M in cost reductions at William Jessup University."
        path="/about"
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8 sm:py-24">
          <Eyebrow>About</Eyebrow>
          <Headline as="h1" className="mt-5 max-w-3xl text-4xl text-ink sm:text-6xl">
            I build the thing, then I stay until it runs
          </Headline>

          <div className="mt-12 grid gap-10 sm:grid-cols-[minmax(0,260px)_minmax(0,1fr)] sm:gap-12">
            {/* ASSET PLACEHOLDER: founder photo — see public/ASSETS.md. */}
            <img
              src="/placeholders/founder-photo.svg"
              alt="Daniel, founder of Yui, photographed in Sacramento."
              width="800"
              height="1000"
              className="aspect-[4/5] w-full rounded-[20px] border border-line object-cover"
            />
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              <p>
                I am Daniel. I have spent my career inside operations rather than beside
                them — as the person accountable when the numbers are wrong, the schedule
                breaks, or nobody can find the file.
              </p>
              <p>
                At Folio Dynamix I worked on operations behind $3.2B in managed assets,
                where a small process gap is not an inconvenience, it is a reportable
                problem. At Greenhaven Soccer Club I ran the operation for 900 players
                across 88 teams — registration, scheduling, volunteers, fields, and a
                hundred parents who needed an answer that evening. At William Jessup
                University I delivered $2M in cost reductions, which in practice meant
                reading every contract and every workflow until the waste was obvious.
              </p>
            </div>
          </div>

          <div className="mt-16 space-y-6 text-lg leading-relaxed text-muted">
            <h2
              className="text-2xl text-ink sm:text-3xl"
              style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
            >
              Why I started Yui
            </h2>
            <p>
              Small businesses get the worst version of operations help. Either a
              consultant arrives, interviews everyone, leaves a deck, and invoices — or a
              software vendor sells a platform that nobody adopts because it was never
              fitted to how the work actually happens. Both leave the owner exactly where
              they started, just poorer and more tired.
            </p>
            <p>
              I wanted to do the opposite: sit inside the operation, find the one or two
              things that are genuinely costing money, and build them. Not recommend them.
              Build them, put them in front of the people who have to use them, fix what
              breaks in week two, and keep going until the business runs without me
              watching it.
            </p>
            <p>
              AI changed what is possible here, and not in the way most of the noise
              suggests. It does not replace anyone in a nine-person company. What it does
              is absorb the work that was never worth a salary and never got done properly
              anyway — the call that went to voicemail, the follow-up nobody sent, the
              report assembled by hand every month. That is unglamorous, and it is where
              the hours are.
            </p>
          </div>

          <div className="mt-16 rounded-[20px] bg-ink p-8 text-white sm:p-10">
            <Eyebrow tone="paper">The name</Eyebrow>
            <h2
              className="mt-5 text-2xl text-white sm:text-3xl"
              style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
            >
              Yui <span className="text-muted-dark">(YOO-ee)</span>
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-dark">
              <p>
                Yui is an old Japanese practice where neighbors pitched in on each
                other&rsquo;s work — a roof to re-thatch, a field to harvest, a house to
                raise. Nobody invoiced anybody. You showed up because the help would come
                back around when it was your turn.
              </p>
              <p>
                That is the standard I am trying to hold. Not a vendor relationship, and
                not charity either — showing up on someone else&rsquo;s work like the
                outcome is partly mine, because in practice it is.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <Eyebrow>Track record</Eyebrow>
            <ul className="mt-6 grid gap-5 sm:grid-cols-3">
              {STATS.map((stat) => (
                <li key={stat.figure}>
                  <Stat {...stat} />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 space-y-6 text-lg leading-relaxed text-muted">
            <h2
              className="text-2xl text-ink sm:text-3xl"
              style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
            >
              How I work
            </h2>
            <p>
              I work with a small number of businesses at a time, because the work is
              hands-on and there is no version of it that scales by adding slides. I am
              based in Sacramento and most of my clients are here, though the work travels
              fine.
            </p>
            <p>
              If your operation is mostly fine and you need one automation built, say so —
              that is a sprint, not a retainer, and I will tell you that on the call. If
              you are the bottleneck for everything and you know it, that is the longer
              engagement. Either way, the first call is me asking what breaks most often,
              and telling you honestly whether I am the right help.
            </p>
          </div>

          <div className="card mt-16 flex flex-col gap-6 p-8 sm:p-10">
            <div>
              <Headline as="h2" className="text-3xl text-ink sm:text-4xl">
                Let&rsquo;s talk about your operation
              </Headline>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">
                Thirty minutes, no pitch deck. Tell me what keeps breaking and I will tell
                you what it would take to fix it.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <BookingLink>Book a fit call</BookingLink>
              <a href={`mailto:${EMAIL}`} className="btn btn-outline-ink">
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
