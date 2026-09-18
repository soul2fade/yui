import { screen } from '@testing-library/react'
import { renderRoute } from './renderRoute'

const PAGES = [
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

describe('routes', () => {
  it.each(PAGES)('renders %s', async (path, testId) => {
    renderRoute(path)
    expect(await screen.findByTestId(testId)).toBeInTheDocument()
  })

  it('sends unknown paths home', async () => {
    renderRoute('/does-not-exist')
    expect(await screen.findByTestId('home-page')).toBeInTheDocument()
  })

  it('puts the wordmark and the fit-call CTA in the nav on every page', async () => {
    renderRoute('/privacy')
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav).toHaveTextContent('Yui')
    expect(nav).toHaveTextContent('Book a fit call')
  })

  it('links the footer to the legal pages and the contact address', async () => {
    renderRoute('/')
    const footer = screen.getByRole('contentinfo')
    for (const label of ['Privacy', 'Terms', 'Security', 'Contact']) {
      expect(footer).toHaveTextContent(label)
    }
    expect(footer).toHaveTextContent('hello@yuiops.com')
    expect(footer).toHaveTextContent('Sacramento, CA')
    expect(footer).toHaveTextContent('© 2026 Yui')
  })
})

describe('booking CTAs', () => {
  // BOOKING_HREF is an external scheduler, so these must be real anchors that
  // open off-site, because a react-router Link cannot navigate away from the app.
  it.each([
    ['/', 'home'],
    ['/about', 'about'],
    ['/free-audit', 'free audit'],
  ])('points the fit-call CTA off-site on %s', (path) => {
    renderRoute(path)
    const ctas = screen.getAllByRole('link', { name: /book a fit call/i })
    expect(ctas.length).toBeGreaterThan(0)
    for (const cta of ctas) {
      expect(cta).toHaveAttribute('href', expect.stringMatching(/^https:\/\/cal\.com\//))
      expect(cta).toHaveAttribute('target', '_blank')
      expect(cta).toHaveAttribute('rel', expect.stringContaining('noopener'))
    }
  })
})
