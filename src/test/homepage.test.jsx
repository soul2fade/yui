import { screen } from '@testing-library/react'
import { renderRoute } from './renderRoute'

describe('homepage', () => {
  it('leads with the hero headline and both CTAs', () => {
    renderRoute('/')
    expect(
      screen.getByRole('heading', { level: 1, name: /keep your tools\. lose the busywork/i })
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
      'faq',
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
    for (const price of ['$1,500', 'First call is free', '$3,500', '$5,000', '$10,000+']) {
      expect(screen.getByText(price)).toBeInTheDocument()
    }
    // Essential is the recommended plan; Growth is a starting price set by SOW.
    expect(screen.getByText('Recommended')).toBeInTheDocument()
    expect(screen.getByText(/starting price/i)).toBeInTheDocument()
    expect(screen.queryByText(/best value/i)).toBeNull()
    expect(screen.getByText(/custom engagements/i)).toBeInTheDocument()
  })

  // The Sprint's system limit is what keeps one price from covering a 1-system
  // job and a 5-system job alike. Guard it and the over-limit rule together.
  it('defines the scope of one Workflow Sprint', () => {
    renderRoute('/')
    const pricing = document.getElementById('pricing')
    expect(pricing.textContent).toMatch(/one process, connecting up to 2 of the systems/i)
    expect(pricing.textContent).toMatch(/more than 2 systems\? we split it into phases/i)
    // The quarterly caps were retired; the at-a-time limit is the only cap.
    expect(pricing.textContent).not.toMatch(/per quarter/i)
  })

  it('shows the work cards', () => {
    renderRoute('/')
    expect(screen.getByRole('heading', { name: 'Budget Stress Test' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Automated Invoicing' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Connected Operations Hub' })).toBeInTheDocument()
  })

  // The custom-build recording shows a business name and customer names on screen,
  // so the card has to say they are invented.
  it('labels the custom build as fictional data', () => {
    renderRoute('/')
    const work = document.getElementById('work')
    expect(work.textContent).toMatch(/fictional business and invented customers/i)
    expect(work.querySelector('video')).toHaveAttribute('src', '/work/ai-operations-assistant.mp4')
  })

  // The budget demo names a real client, so the card has to say plainly that the
  // figures in the demo are not that client's. Removing this sentence would turn
  // an honest attribution into an implied claim about William Jessup University's
  // actual budget, so it is asserted rather than left to review.
  it('names the client but disclaims the demo data', () => {
    renderRoute('/')
    const work = document.getElementById('work')
    expect(work.textContent).toMatch(/William Jessup University/)
    expect(work.textContent).toMatch(/invented numbers for a fictional contractor/i)
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

describe('remote assessment', () => {
  it('links the remote card to the paid Cal.com event and offers the fit call', () => {
    renderRoute('/')
    const card = document.getElementById('remote-assessment')
    expect(card).toBeTruthy()
    const book = screen.getByRole('link', { name: /book a remote assessment/i })
    expect(book).toHaveAttribute('href', 'https://cal.com/yuiops/remote-ops-assessment')
    expect(card.textContent).toMatch(/\$1,500/)
    expect(card.textContent).toMatch(/9:00 to 9:45/)
    expect(card.querySelector('a[href="https://cal.com/yuiops/fit-call"]')).toBeTruthy()
  })
})

describe('remote monthly plans', () => {
  it('presents on-site and remote as equal, with the same price and sprints', () => {
    renderRoute('/')
    const card = document.getElementById('remote-plans')
    expect(card).toBeTruthy()
    expect(card.textContent).toMatch(/two ways to work with us\. one price\./i)
    expect(card.textContent).toMatch(/same monthly price/i)
    expect(card.textContent).toMatch(/1 Workflow Sprint at a time on Essential, 2 on Growth/)
    expect(card.textContent).toMatch(/every other week on Essential, weekly on Growth/)
    expect(card.textContent).toMatch(/reserved working time/i)
    // Remote is described by what it includes, never by what it lacks.
    expect(card.textContent).not.toMatch(/in place of|outside sacramento|comes first/i)
  })
})
