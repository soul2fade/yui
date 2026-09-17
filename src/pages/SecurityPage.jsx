import LegalPage from '../components/LegalPage'
import { EMAIL } from '../site'

// NOTE: describes how the site and our engagements are actually run. Keep it
// accurate — update this page when the practices change, not just the date.
const SECTIONS = [
  {
    heading: 'How this site is built',
    paragraphs: [
      'yuiops.com is a static site served over HTTPS. The pages are prerendered at build time, so there is no CMS, no database, and no admin login attached to the marketing site for anyone to attack.',
    ],
  },
  {
    heading: 'Credentials and keys',
    paragraphs: [
      'The free diagnostics call our own serverless functions, and those functions hold the API credentials. No key is shipped to your browser, and none is present in this site’s source.',
      'Client credentials we hold for engagement work live in a password manager with multi-factor authentication, are scoped to the minimum access the work needs, and are rotated or revoked when an engagement ends.',
    ],
  },
  {
    heading: 'What the diagnostics send',
    paragraphs: [
      'The quiz answers you select are posted to our function, which forwards them to Anthropic’s API to generate a result. We do not ask for your name or email in either tool, so there is nothing identifying attached to those answers.',
    ],
  },
  {
    heading: 'Data handling in client work',
    paragraphs: [
      'When we build systems that touch your data, we work inside your accounts wherever possible rather than copying data into ours. Where a copy is unavoidable, we agree in writing what is copied, where it lives, and when it is deleted.',
      'We do not use client data to train models, and we do not move it into tools you have not agreed to.',
    ],
  },
  {
    heading: 'Access and offboarding',
    paragraphs: [
      'Access is granted per person and per system, never shared. At the end of an engagement we walk through revoking our access with you, and we hand over documentation for everything we built so nothing depends on us being reachable.',
    ],
  },
  {
    heading: 'Reporting a vulnerability',
    paragraphs: [
      `If you find a security issue with this site or with something we built, email ${EMAIL} with enough detail to reproduce it. We will acknowledge it within two business days and keep you posted while we fix it.`,
      'Please do not run intrusive or destructive testing against production systems, and please give us a reasonable window to fix an issue before disclosing it publicly.',
    ],
  },
]

export default function SecurityPage() {
  return (
    <LegalPage
      testId="security-page"
      title="Security"
      metaTitle="Security | Yui"
      description="How yuiops.com is built, where credentials live, what the free diagnostics send, and how to report a vulnerability."
      path="/security"
      updated="September 2026"
      intro="We build operational systems for other people, so it would be poor form to be careless with our own. Here is how this site and our engagements are run."
      sections={SECTIONS}
    />
  )
}
