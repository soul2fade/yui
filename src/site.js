// Single source of truth for the handful of facts that appear in more than one
// place. Change them here, not in the components.

export const EMAIL = 'hello@yuiops.com'
export const SECURITY_EMAIL = 'security@yuiops.com'
export const FOUNDER_EMAIL = 'daniel@yuiops.com'
export const LOCATION = 'Sacramento, CA'

// Legal-page facts. These carried over from the prior brand's reviewed policies
// and describe the same operating entity. Confirm each before launch.
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
export const BOOKING_HREF = 'https://cal.com/yuiops/fit-call'

export const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Work', href: '/#work' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', href: '/about' },
]

// Credentials, shown on the homepage About section, the About page and the
// footer. Two rules for anything added here.
//
// 1. Use the credential's own title, not a paraphrase. The Google one is a
//    "Professional Certificate" from Google Career Certificates, delivered via
//    Coursera. It is not a "professional certification" and the certificate's
//    own fine print says so, so it must not be written that way.
// 2. `verify` is the issuer's public verification page and nothing else. If a
//    credential has no public verification URL, leave the field out rather than
//    linking somewhere that merely looks official.
//
// Do not add a Claude Partner Network or Anthropic partnership line here. As of
// 2026-09-25 the application has cleared initial review only, the status is "on
// the path to partnership" rather than membership, and the programme's own
// email asks applicants to hold off on any public announcement of partnership
// until they are told otherwise. It goes back on the site when Anthropic says
// so in writing, and not before.
export const CREDENTIALS = [
  {
    name: 'Google AI Professional Certificate',
    issuer: 'Google Career Certificates',
    short: 'Google AI Professional Certificate',
    verify: 'https://coursera.org/verify/professional-cert/E9VPWGEXULZ9',
  },
]

// Shown on the homepage About section and again on the About page.
export const STATS = [
  { figure: '$3.2B', label: 'Assets managed', detail: 'Folio Dynamix' },
  { figure: '900+', label: 'Players and 88 teams run', detail: 'Greenhaven Soccer Club' },
  { figure: '$2M', label: 'Cost reductions delivered', detail: 'William Jessup University' },
]
