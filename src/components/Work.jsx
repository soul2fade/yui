import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Eyebrow, Headline } from './ui'

// A custom client-style build, shown as a silent screen recording rather than a
// clickable demo. The recording is cropped to the chat column so the product's own
// branding and the account name in the sidebar stay out of frame.
const FEATURED = {
  kicker: 'Custom build',
  name: 'Connected Operations Hub',
  body:
    'Built for a business running five platforms: Jobber, QuickBooks, Gusto, HubSpot, and Square. We connected them into one hub the owner directs from a chat. Here the owner asks which finished jobs still need an invoice, and it finds $14,600 sitting unbilled across ten jobs and drafts every invoice for one-click approval. Shown with a fictional business and invented customers.',
  facts: ['Five platforms, one hub', 'Directed by chat, in plain language', 'It drafts the work, you approve it'],
  video: '/work/ai-operations-assistant.mp4',
  poster: '/work/ai-operations-assistant.jpg',
  label:
    'Screen recording: the owner asks which completed jobs still need invoicing, the assistant lists ten unbilled jobs totaling $14,600, then drafts an invoice for each one.',
}

// A real test call, recorded on the pipeline and the owner's phone at the same
// time and cut into one synced clip. The caller was a real person, so her name,
// photo and number are blurred in every frame, and the card has to say so. The
// other pipeline rows are seeded sample data. Captions are burned in because
// browsers only autoplay muted video.
const LIVE_TEST = {
  kicker: 'Live test',
  name: 'Missed-Call Follow-Up',
  body:
    "A call goes unanswered. The caller gets a text back, their reply lands in the lead pipeline, and the owner gets one text asking whether it is a real lead. One reply qualifies it and sends the caller a booking link. The pipeline is a spreadsheet-style view on purpose. It works like the spreadsheets most teams already use, so there is little to learn. In this test the first call was missed at 8:38 PM and the appointment was booked by 8:42. The caller's name, photo and number are blurred. The other pipeline rows are sample data.",
  facts: ['Missed call to text back', 'One reply qualifies the lead', 'The caller picks the time'],
  video: '/work/missed-call-live-test.mp4',
  poster: '/work/missed-call-live-test.jpg',
  label:
    "Screen recording of a live test, with the lead pipeline on the left and the owner's phone on the right: a missed call, the caller's text reply landing in the pipeline, the owner replying 1 to qualify the lead, and the booking arriving at 8:42, four minutes after the first missed call at 8:38. The caller's name, photo and number are blurred.",
}

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

// Loops silently like a GIF, except for visitors who ask for reduced motion, who
// get the poster frame and the player controls instead.
function FeaturedVideo({
  src,
  poster,
  label,
  width = '1120',
  height = '1030',
  className = 'aspect-[1120/1030] w-full border-b border-line bg-paper object-cover lg:border-r lg:border-b-0',
}) {
  const ref = useRef(null)
  useEffect(() => {
    const video = ref.current
    if (!video || typeof window.matchMedia !== 'function') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
      video.controls = true
    }
  }, [])
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className={className}
    />
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
          The custom build and both demos run on sample data. The live test is a real
          call, with the caller&apos;s details blurred. Watch the recordings, or open
          either demo and click around.
        </p>

        <article className="card mt-14 grid overflow-hidden lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <FeaturedVideo src={FEATURED.video} poster={FEATURED.poster} label={FEATURED.label} />
          <div className="flex flex-col p-7 sm:p-8 lg:p-10">
            <span className="mono text-accent">{FEATURED.kicker}</span>
            <h3
              className="mt-4 text-2xl text-ink sm:text-3xl"
              style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
            >
              {FEATURED.name}
            </h3>
            <p className="mt-3.5 leading-relaxed text-muted">{FEATURED.body}</p>
            <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
              {FEATURED.facts.map((fact) => (
                <li key={fact} className="mono text-muted">
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
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

        {/* Full width, video on top: the clip is 16:9 with burned-in captions, and
            a half-width column would shrink the captions past reading size. */}
        <article className="card mt-5 overflow-hidden">
          <FeaturedVideo
            src={LIVE_TEST.video}
            poster={LIVE_TEST.poster}
            label={LIVE_TEST.label}
            width="1920"
            height="1080"
            className="aspect-video w-full border-b border-line bg-paper object-cover"
          />
          <div className="grid gap-6 p-7 sm:p-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-10 lg:p-10">
            <div>
              <span className="mono text-accent">{LIVE_TEST.kicker}</span>
              <h3
                className="mt-4 text-2xl text-ink sm:text-3xl"
                style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
              >
                {LIVE_TEST.name}
              </h3>
              <p className="mt-3.5 leading-relaxed text-muted">{LIVE_TEST.body}</p>
            </div>
            <ul className="space-y-2.5 border-t border-line pt-6 lg:self-end lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              {LIVE_TEST.facts.map((fact) => (
                <li key={fact} className="mono text-muted">
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  )
}
