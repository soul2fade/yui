// Single source of truth for the handful of facts that appear in more than one
// place. Change them here, not in the components.

export const EMAIL = 'hello@yuiops.com'
export const SECURITY_EMAIL = 'security@yuiops.com'
export const FOUNDER_EMAIL = 'daniel@yuiops.com'
export const LOCATION = 'Sacramento, CA'

// Legal-page facts. These carried over from the prior brand's reviewed policies
// and describe the same operating entity — confirm each before launch.
export const PHONE = '916-775-7717'
export const ENTITY = 'Man Up Mentality Project LLC'
export const POSTAL_ADDRESS = [
  'Yui',
  'Daniel Zimmer',
  '5960 South Land Park Dr #608',
  'Sacramento, CA 95822',
]
export const APP_URL = 'app.yuiops.com'

// Fit-call destination. External URLs are fine here: <BookingLink> renders an
// anchor for them and a router link for internal paths. Swap this one constant
// and every CTA on the site follows.
export const BOOKING_HREF = 'https://cal.com/benchcoo/fit-call'

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
