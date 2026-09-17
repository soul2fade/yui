import Meta from './Meta'
import { Eyebrow, Headline } from './ui'

// Shared shell for /privacy, /terms and /security. `sections` is an array of
// { heading, paragraphs: string[] }.
export default function LegalPage({ testId, title, metaTitle, description, path, updated, intro, sections }) {
  return (
    <div data-testid={testId}>
      <Meta title={metaTitle} description={description} path={path} />

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:px-8 sm:py-24">
          <Eyebrow>Legal</Eyebrow>
          <Headline as="h1" className="mt-5 text-4xl text-ink sm:text-5xl">
            {title}
          </Headline>
          <p className="mono mt-6 text-muted">Last updated {updated}</p>
          <p className="mt-8 text-lg leading-relaxed text-muted">{intro}</p>

          <div className="mt-14 space-y-12">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2
                  className="text-xl text-ink sm:text-2xl"
                  style={{ fontWeight: 600, letterSpacing: '-0.02em' }}
                >
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-muted">
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
