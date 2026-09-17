// Single source of truth for the handful of facts that appear in more than one
// place. Change them here, not in the components.

export const EMAIL = 'hello@yuiops.com'
export const LOCATION = 'Sacramento, CA'

// Fit-call destination. Points at the contact page until a scheduler link
// exists — swap this one constant when it does and every CTA follows.
export const BOOKING_HREF = '/contact'

export const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Work', href: '/#work' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', href: '/about' },
]

// Shown on the homepage About section and again on the About page.
export const STATS = [
  { figure: '$3.2B', label: 'Assets managed', detail: 'Folio Dynamix' },
  { figure: '900+', label: 'Players and 88 teams run', detail: 'Greenhaven Soccer Club' },
  { figure: '$2M', label: 'Cost reductions delivered', detail: 'William Jessup University' },
]
