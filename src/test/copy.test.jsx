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
