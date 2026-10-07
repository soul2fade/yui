import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta'
import { Eyebrow, Headline } from '../components/ui'

// Where both Cal.com webinar events redirect after booking. Hands over the
// worksheet two ways, both static files in public/: the printable PDF and the
// interactive version at /stop-doing-list/. Not truly gated: anyone with the
// URL can open it, so it is kept out of the sitemap and search results.
export const WORKSHEET_HREF = '/yui-stop-doing-list.pdf'
export const WORKSHEET_ONLINE_HREF = '/stop-doing-list/'

const linkCls =
  'text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent'

export default function WebinarRegisteredPage() {
  return (
    <div data-testid="webinar-registered-page">
      <Meta
        title="You are registered | Yui"
        description="Your seat for the Stop-Doing List webinar is saved. Grab the worksheet."
        path="/webinar/registered"
      />
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:px-8 sm:py-24">
          <Eyebrow>You are registered</Eyebrow>
          <Headline as="h1" className="mt-5 text-4xl text-ink sm:text-5xl">
            Your seat is saved
          </Headline>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Your confirmation email from Cal.com has the join link. Grab the worksheet now and
            start your list, so it is ready when the session starts.
          </p>

          <div className="card mt-12 p-7 sm:p-9">
            <span className="mono text-accent">The Stop-Doing List worksheet</span>
            <p className="mt-3 leading-relaxed text-muted">
              List the tasks that eat your week, count what each one costs you, and sort each
              one: drop it, delegate it, or automate it.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <a href={WORKSHEET_HREF} download className="btn btn-accent w-full sm:w-auto">
                Download the worksheet (PDF)
              </a>
              <p className="text-[0.9375rem] text-muted">
                Or{' '}
                <a href={WORKSHEET_ONLINE_HREF} className={linkCls}>
                  fill it in online
                </a>
                . It adds up your hours as you go.
              </p>
            </div>
          </div>

          <p className="mt-10 text-[0.9375rem] leading-relaxed text-muted">
            While you wait, the{' '}
            <Link to="/audit" className={linkCls}>
              Operations Health Check
            </Link>{' '}
            takes about two minutes and shows where your hours are going.
          </p>
        </div>
      </section>
    </div>
  )
}
