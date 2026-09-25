import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { screen } from '@testing-library/react'
import { renderRoute } from './renderRoute'

// House style: no em or en dashes anywhere in the copy, typographic convention
// notwithstanding. This catches them in rendered text, which is what a reader
// actually sees.
const ROUTES = [
  ['/', 'home-page'],
  ['/about', 'about-page'],
  ['/audit', 'audit-page'],
  ['/bottleneck', 'bottleneck-page'],
  ['/free-audit', 'free-audit-page'],
  ['/contact', 'contact-page'],
  ['/privacy', 'privacy-page'],
  ['/terms', 'terms-page'],
  ['/security', 'security-page'],
]

describe('copy style', () => {
  it.each(ROUTES)('%s contains no em or en dash', (path, testId) => {
    renderRoute(path)
    const text = screen.getByTestId(testId).textContent
    const found = text.match(/[^.]{0,40}[—–][^.]{0,40}/g)
    expect(found, `dash in ${path}: ${found?.join(' | ')}`).toBeNull()
  })
})

// The rendered check above cannot see copy that only appears after interaction,
// such as the quiz answer options. Scan the source for the characters instead.
function sourceFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return /\.(js|jsx|css)$/.test(path) ? [path] : []
  })
}

describe('source copy', () => {
  it('has no em or en dash in any source file', () => {
    const offenders = []
    for (const path of sourceFiles('src')) {
      if (path.endsWith('copy.test.jsx')) continue // this file names the characters
      readFileSync(path, 'utf8')
        .split('\n')
        .forEach((line, i) => {
          if (/[—–]/.test(line)) offenders.push(`${path}:${i + 1} ${line.trim().slice(0, 70)}`)
        })
    }
    expect(offenders, offenders.join('\n')).toHaveLength(0)
  })
})

// Credentials are the one place on the site where a wording slip becomes a
// false claim about a third party's programme. The Google credential is a
// "Professional Certificate" from Google Career Certificates. Calling it a
// certification, or calling Daniel a "certified Google AI professional",
// overstates what the certificate says on its face, so the wrong shape is
// asserted against rather than left to review.
describe('credentials', () => {
  const SURFACES = [
    ['/', 'home-page'],
    ['/about', 'about-page'],
  ]

  it.each(SURFACES)('%s states the Google certificate', (path, testId) => {
    renderRoute(path)
    const text = screen.getByTestId(testId).textContent
    expect(text).toMatch(/Google AI Professional Certificate, Google Career Certificates/)
  })

  // The Claude Partner Network application has cleared initial review only. The
  // programme asked that no partnership be announced publicly until it says so,
  // so any partner or partnership claim is a breach of that request as well as
  // an overstatement of where things stand. Asserted, not left to review.
  it.each(SURFACES)('%s claims no Anthropic partnership', (path, testId) => {
    renderRoute(path)
    const text = screen.getByTestId(testId).textContent
    expect(text).not.toMatch(/partner/i)
    expect(text).not.toMatch(/Anthropic/i)
  })

  it.each(SURFACES)('%s never calls it a certification', (path, testId) => {
    renderRoute(path)
    const text = screen.getByTestId(testId).textContent
    expect(text).not.toMatch(/certified Google/i)
    expect(text).not.toMatch(/Google AI (Professional )?Certification/i)
  })

  it('links the Google certificate to Google’s own verification page', () => {
    renderRoute('/about')
    const verify = screen.getAllByRole('link', { name: /^verify$/i })
    expect(verify.length).toBeGreaterThan(0)
    expect(verify[0]).toHaveAttribute(
      'href',
      'https://coursera.org/verify/professional-cert/E9VPWGEXULZ9'
    )
    expect(verify[0]).toHaveAttribute('target', '_blank')
    expect(verify[0].getAttribute('rel')).toContain('noopener')
  })

  it('carries the short form in the footer', () => {
    renderRoute('/')
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveTextContent('Google AI Professional Certificate')
    expect(footer.textContent).not.toMatch(/partner/i)
  })
})
