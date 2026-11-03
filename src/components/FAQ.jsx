import { Eyebrow, Headline } from './ui'

// Every answer here restates a term already published elsewhere on the site
// (Pricing, How it works, the remote assessment card). If one of those terms
// changes, change it here too. Do not add answers about who owns a build after
// cancellation until the client agreement settles it.
const QUESTIONS = [
  {
    q: 'Do we have to switch software?',
    a: 'No. We build on the tools you already pay for and connect them so they share information. A custom tool only comes in when nothing you own fits the job.',
  },
  {
    q: 'What access do you need to our systems?',
    a: 'For the assessment, view-only access to the systems you want reviewed. Nothing gets changed. Anything a build needs is written into the Statement of Work before work starts.',
  },
  {
    q: 'How does the $1,500 assessment credit work?',
    a: 'The full $1,500 counts toward your first month if you start a monthly plan within two weeks of your results. On-site and remote work the same way.',
  },
  {
    q: 'Can we cancel a monthly plan?',
    a: 'Yes. Both plans are month to month, with 30 days’ notice to cancel. No annual contract.',
  },
  {
    q: 'Do you work with businesses outside Sacramento?',
    a: 'Yes. Remote clients pay the same monthly price and get reserved working time with us every week, with the weekly operations meeting over video instead of site visits.',
  },
  {
    q: 'What happens on the fit call?',
    a: 'Fifteen minutes. We ask what breaks most often and where your week goes. If we are not the right help, we say so on the call.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <Eyebrow>Questions</Eyebrow>
        <Headline as="h2" className="mt-5 max-w-2xl text-4xl text-ink sm:text-5xl">
          Before you book
        </Headline>

        <div className="mt-14 divide-y divide-line border-y border-line">
          {QUESTIONS.map((item) => (
            <details key={item.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-xl text-ink [&::-webkit-details-marker]:hidden">
                <span style={{ fontWeight: 600, letterSpacing: '-0.02em' }}>{item.q}</span>
                <span aria-hidden="true" className="shrink-0 text-2xl leading-none text-accent transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
