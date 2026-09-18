import { screen } from '@testing-library/react'
import { renderRoute } from './renderRoute'

// House style: no em dashes anywhere in the copy. This catches them in rendered
// text, which is what a reader actually sees.
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
  it.each(ROUTES)('%s contains no em dash', (path, testId) => {
    renderRoute(path)
    const text = screen.getByTestId(testId).textContent
    const found = text.match(/[^.]{0,40}—[^.]{0,40}/g)
    expect(found, `em dash in ${path}: ${found?.join(' | ')}`).toBeNull()
  })
})
