import Meta from '../components/Meta'
import { Eyebrow, Headline } from '../components/ui'

// Stop-Doing List webinar. Registration happens on Cal.com, one event per date.
// Each Cal.com event redirects to /webinar/registered after booking, which is
// where the worksheet lives (see WebinarRegisteredPage).
export const SESSIONS = [
  {
    day: 'Wednesday',
    short: 'Wed, Nov 4',
    date: 'November 4',
    time: '11:00 to 11:45am PT',
    href: 'https://cal.com/stop-lists',
  },
  {
    day: 'Thursday',
    short: 'Thu, Nov 5',
    date: 'November 5',
    time: '1:00 to 1:45pm PT',
    href: 'https://cal.com/stop-lists2',
  },
]

const OUTCOMES = [
  ['List it', 'Every recurring task you would hand off tomorrow if you could.'],
  ['Count it', 'What each one costs you in hours a month, using your own numbers.'],
  ['Sort it', 'Three questions, in order: drop it, delegate it, or automate it.'],
]

export default function WebinarPage() {
  return (
    <div data-testid="webinar-page">
      <Meta
        title="Free webinar: build your stop-doing list | Yui"
        description="A free 45-minute working session for Sacramento-area business owners. List, count, and sort the tasks eating your week. Wed Nov 4 at 11am PT or Thu Nov 5 at 1pm PT, online."
        path="/webinar"
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-24">
          <Eyebrow>Free live session · Online</Eyebrow>
          <Headline as="h1" className="mt-5 text-4xl text-ink sm:text-5xl">
            Build your stop-doing list
          </Headline>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Your to-do list is full. Nothing leaves it, because nobody ever decided it should.
            In 45 minutes you will work through your own list live and leave with it sorted,
            plus one task moved out of each column.
          </p>
          <a href="#register" className="btn btn-accent mt-8 lg:hidden">
            Save my seat
          </a>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-12">
            <div className="space-y-10">
              <div>
                <span className="mono text-accent">Two dates, same session</span>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {SESSIONS.map((s) => (
                    <div key={s.href} className="card p-6">
                      <p className="mono text-muted">{s.day}</p>
                      <p
                        className="mt-2 text-2xl text-ink"
                        style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
                      >
                        {s.date}
                      </p>
                      <p className="mt-2 text-[0.9375rem] text-muted">{s.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="mono text-accent">What you will do</span>
                <ol className="mt-4 space-y-4">
                  {OUTCOMES.map(([title, body], i) => (
                    <li key={title} className="flex gap-4">
                      <span className="mono mt-1 text-muted">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <p className="text-[0.9375rem] font-semibold text-ink">{title}</p>
                        <p className="mt-1 leading-relaxed text-muted">{body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card p-6 sm:p-7">
                <span className="mono text-accent">Comes with the worksheet</span>
                <p className="mt-3 leading-relaxed text-muted">
                  Register and the Stop-Doing List worksheet is yours right away. Print it or
                  fill it in on screen, and have it open when the session starts. You will finish
                  it live.
                </p>
              </div>

              <p className="text-[0.9375rem] leading-relaxed text-muted">
                Built for owners in the Sacramento region, so registration asks where your
                business is based. Hosted by Daniel Zimmer, founder of Yui.
              </p>
            </div>

            <div className="card p-7 sm:p-9 self-start" id="register">
              <span className="mono text-accent">Save your seat</span>
              <h2
                className="mt-4 text-2xl text-ink"
                style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
              >
                Pick a date
              </h2>
              <div className="mt-6 space-y-3">
                {SESSIONS.map((s) => (
                  <a key={s.href} href={s.href} className="btn btn-accent w-full">
                    Register for {s.short}
                  </a>
                ))}
              </div>
              <p className="mt-5 text-[0.8125rem] leading-relaxed text-muted">
                Free and online. Registration takes a minute on Cal.com. Your confirmation email
                has the join link, and you come straight back here for the worksheet.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
