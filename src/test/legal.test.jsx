import { screen } from '@testing-library/react'
import { renderRoute } from './renderRoute'

// The legal pages are ported from the prior brand's reviewed policies, so the
// thing most likely to go wrong is a missed find-and-replace.
const PAGES = [
  ['/privacy', 'privacy-page'],
  ['/terms', 'terms-page'],
  ['/security', 'security-page'],
]

const STALE = [/bench\s*coo/i, /thebenchcoo/i, /benchcoo/i]

describe('legal pages', () => {
  it.each(PAGES)('%s carries no prior-brand references', (path, testId) => {
    renderRoute(path)
    const text = screen.getByTestId(testId).textContent
    for (const pattern of STALE) {
      expect(text, `${path} still mentions ${pattern}`).not.toMatch(pattern)
    }
  })

  it.each(PAGES)('%s names Yui and the operating entity', (path, testId) => {
    renderRoute(path)
    const text = screen.getByTestId(testId).textContent
    expect(text).toMatch(/\bYui\b/)
  })

  it('keeps the SMS opt-out instructions and number on privacy and terms', () => {
    for (const path of ['/privacy', '/terms']) {
      const { unmount } = renderRoute(path)
      const text = document.body.textContent
      expect(text, `${path} lost the STOP keyword`).toMatch(/STOP/)
      expect(text, `${path} lost the SMS number`).toMatch(/916-775-7717/)
      unmount()
    }
  })

  it('discloses what the free diagnostics send, on the privacy page', () => {
    renderRoute('/privacy')
    const text = screen.getByTestId('privacy-page').textContent
    expect(text).toMatch(/Operations Health Check/)
    expect(text).toMatch(/Find My Bottleneck/)
    expect(text).toMatch(/Anthropic/)
    expect(text).toMatch(/do not save your answers/)
  })

  it('points the security page at the security address', () => {
    renderRoute('/security')
    expect(screen.getByTestId('security-page').textContent).toMatch(/security@yuiops\.com/)
  })
})
