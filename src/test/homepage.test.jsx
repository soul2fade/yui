import { screen } from '@testing-library/react'
import { renderRoute } from './renderRoute'

describe('homepage', () => {
  it('leads with the hero headline and both CTAs', () => {
    renderRoute('/')
    expect(
      screen.getByRole('heading', { level: 1, name: /the operator your business is missing/i })
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /book a fit call/i }).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: /see how it works/i })).toBeInTheDocument()
  })

  // The name story is no longer its own section. It moved into the hero so the
  // pronunciation is read above the fold, so it is a div inside the hero rather
  // than a sibling section. Its presence and voice are covered by voice.test.jsx,
  // and the anchor target is asserted below.
  it('keeps the name story in the hero, above the first section', () => {
    const { container } = renderRoute('/')
    const name = container.querySelector('#name')
    expect(name).toBeTruthy()
    expect(name.closest('section')).toBe(container.querySelector('section'))
    expect(name.textContent).toMatch(/YOO-ee/)
  })

  it('renders the sections in order', () => {
    const { container } = renderRoute('/')
    const ids = [...container.querySelectorAll('section[id]')].map((el) => el.id)
    expect(ids).toEqual([
      'problem',
      'diagnostics',
      'services',
      'how-it-works',
      'work',
      'pricing',
      'about',
      'contact',
    ])
  })

  it('offers both diagnostics with the no-email subline', () => {
    renderRoute('/')
    expect(screen.getByRole('link', { name: /start the health check/i })).toHaveAttribute(
      'href',
      '/audit'
    )
    expect(screen.getByRole('link', { name: /find my bottleneck/i })).toHaveAttribute(
      'href',
      '/bottleneck'
    )
    expect(screen.getByText(/no email required/i)).toBeInTheDocument()
  })

  it('shows all four price points and the custom-engagement callout', () => {
    renderRoute('/')
    for (const price of ['$495', '$995 for teams', '$3,500', '$2,500', '$4,000']) {
      expect(screen.getByText(price)).toBeInTheDocument()
    }
    expect(screen.getByText(/most popular/i)).toBeInTheDocument()
    expect(screen.getByText(/custom engagements/i)).toBeInTheDocument()
  })

  it('shows the work cards', () => {
    renderRoute('/')
    expect(screen.getByRole('heading', { name: 'Budget Stress Test' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Automated Invoicing' })).toBeInTheDocument()
  })

  // Both demos live off-site. react-router's Link renders a relative href and
  // cannot navigate away, so these have to be plain anchors that open in a new
  // tab. This guards against a regression back to <Link>.
  it('links both demos off-site, in a new tab', () => {
    renderRoute('/')
    const links = screen.getAllByRole('link', { name: /open the demo/i })
    expect(links).toHaveLength(2)
    const hrefs = links.map((a) => a.getAttribute('href')).sort()
    expect(hrefs).toEqual([
      'https://automatedinvoicedemo.netlify.app',
      'https://budget-stress-test.netlify.app',
    ])
    for (const a of links) {
      expect(a).toHaveAttribute('target', '_blank')
      expect(a.getAttribute('rel')).toContain('noopener')
    }
  })

  it('carries no testimonial block', () => {
    const { container } = renderRoute('/')
    expect(container.querySelector('blockquote')).toBeNull()
    expect(screen.queryByText(/testimonial/i)).toBeNull()
  })

  it('states the three track-record stats and links to the About page', () => {
    renderRoute('/')
    expect(screen.getByText('$3.2B')).toBeInTheDocument()
    expect(screen.getByText('900+')).toBeInTheDocument()
    expect(screen.getByText('$2M')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /more about daniel/i })).toHaveAttribute(
      'href',
      '/about'
    )
  })

  it('gives every image alt text', () => {
    const { container } = renderRoute('/')
    const images = [...container.querySelectorAll('img')]
    expect(images.length).toBeGreaterThan(0)
    for (const img of images) {
      expect(img.getAttribute('alt')).toBeTruthy()
    }
  })
})
