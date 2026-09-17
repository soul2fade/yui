import Meta from './Meta'
import { Eyebrow, Headline } from './ui'

// Shared shell for /privacy, /terms and /security.
//
// `sections` is an array of { heading, content }, where each content entry is
// one of:
//   { type: 'p', text }                     a paragraph
//   { type: 'h3', text }                    a subsection heading
//   { type: 'ul', items: [] }               a bulleted list
//   { type: 'table', head: [], rows: [[]] } a two-or-more column table
//   { type: 'address', lines: [] }          a postal address block
function Block({ block }) {
  switch (block.type) {
    case 'h3':
      return (
        <h3
          className="pt-2 text-[1.0625rem] text-ink"
          style={{ fontWeight: 600, letterSpacing: '-0.01em' }}
        >
          {block.text}
        </h3>
      )
    case 'ul':
      return (
        <ul className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.5rem] block shrink-0 bg-accent"
                style={{ width: 6, height: 6, borderRadius: 2 }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'table':
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[0.9375rem]">
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th
                    key={cell}
                    scope="col"
                    className="mono border-b border-line py-2.5 pr-4 text-muted"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  <th
                    scope="row"
                    className="border-b border-line py-2.5 pr-4 align-top font-medium text-ink"
                  >
                    {row[0]}
                  </th>
                  {row.slice(1).map((cell, i) => (
                    <td key={i} className="border-b border-line py-2.5 pr-4 align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'address':
      return (
        <address className="not-italic leading-relaxed">
          {block.lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </address>
      )
    default:
      return <p>{block.text}</p>
  }
}

export default function LegalPage({
  testId,
  title,
  metaTitle,
  description,
  path,
  updated,
  intro,
  sections,
}) {
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
                  {section.content.map((block, i) => (
                    <Block key={i} block={block} />
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
