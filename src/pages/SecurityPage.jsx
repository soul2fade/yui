import LegalPage from '../components/LegalPage'
import { APP_URL, EMAIL, FOUNDER_EMAIL, PHONE, POSTAL_ADDRESS, SECURITY_EMAIL } from '../site'

// Ported from the prior brand's security & disclosure page. Only the business
// name, domains, and contact addresses changed; the scope, subprocessor list and
// data-handling practices carried over as-is.
const SECTIONS = [
  {
    heading: '1. Reporting a vulnerability',
    content: [
      {
        type: 'p',
        text: `If you believe you have found a security issue in our app, website, or any connected integration, please email ${SECURITY_EMAIL} with a description of the issue and steps to reproduce. The address forwards directly to the founder.`,
      },
      {
        type: 'p',
        text: `A machine-readable version of this contact lives at https://${APP_URL}/.well-known/security.txt per RFC 9116.`,
      },
    ],
  },
  {
    heading: '2. What to expect from us',
    content: [
      {
        type: 'ul',
        items: [
          'Initial acknowledgement within 5 business days of receiving your report.',
          'An assessment within 10 business days covering severity, expected fix timeline, and any clarifying questions.',
          'A fix and verification for confirmed issues; we will coordinate public disclosure timing with you if applicable.',
          'Public acknowledgement of your contribution on this page if you would like it; otherwise we will respect any request to remain anonymous.',
        ],
      },
      {
        type: 'p',
        text: 'We do not currently run a paid bug-bounty program, but we are happy to acknowledge researchers who report issues in good faith.',
      },
    ],
  },
  {
    heading: '3. Scope',
    content: [
      { type: 'p', text: 'The following are in scope for vulnerability disclosure:' },
      {
        type: 'ul',
        items: [
          `The app at https://${APP_URL} and its API endpoints`,
          'The marketing site at https://yuiops.com',
          'OAuth integration code (QuickBooks, HubSpot, Square, Jobber, Gusto, and any future connectors)',
          'Webhook handlers and write-back endpoints',
        ],
      },
      {
        type: 'p',
        text: 'Issues on the platforms we integrate with (QuickBooks, HubSpot, Square, etc.) should be reported to those vendors directly. We will help coordinate where appropriate.',
      },
    ],
  },
  {
    heading: '4. Out of scope',
    content: [
      {
        type: 'p',
        text: 'The following are explicitly out of scope and we ask that you do not test them:',
      },
      {
        type: 'ul',
        items: [
          'Denial-of-service or volumetric testing of any kind',
          'Social engineering of staff, customers, or third-party vendors',
          'Physical attacks on our infrastructure or premises',
          'Brute-forcing login credentials or rate-limit testing',
          'Reports based purely on missing headers without a concrete impact',
          'Self-XSS, clickjacking on pages with no sensitive action, or vulnerabilities requiring physical access to an unlocked device',
          'Accessing, downloading, modifying, or deleting data belonging to anyone other than yourself or a test account you control',
        ],
      },
    ],
  },
  {
    heading: '5. Safe harbor',
    content: [
      {
        type: 'p',
        text: 'If you make a good-faith effort to comply with this policy (you stay in scope, you do not exfiltrate data, you do not disrupt service, and you give us a reasonable window to respond before public disclosure), we will not pursue legal action, regulatory complaints, or DMCA claims against you for your research.',
      },
      {
        type: 'p',
        text: 'We cannot grant safe harbor on behalf of third parties (the platforms our app integrates with). If your research touches their systems, please follow their published disclosure programs.',
      },
    ],
  },
  {
    heading: '6. Subprocessors',
    content: [
      {
        type: 'p',
        text: 'We use the following third-party services to operate the product. Each is named here in the spirit of transparency and to support customer due-diligence requests.',
      },
      {
        type: 'table',
        head: ['Service', 'Purpose'],
        rows: [
          ['Netlify', 'Application hosting, CDN, edge functions, forms'],
          ['Supabase', 'Managed Postgres database, authentication, file storage'],
          ['Anthropic', 'Claude language model for the agent and the site diagnostics'],
          ['Stripe', 'Subscription billing and payment processing'],
          ['Resend', 'Transactional email (invitations, notifications)'],
          [
            'Sentry',
            'Application error monitoring (with sensitive headers and OAuth-shaped query parameters scrubbed before transmission)',
          ],
          ['Plausible', 'Privacy-respecting product analytics (no individual user tracking)'],
          ['Google Workspace', 'Operational email (hello@, daniel@, security@)'],
          ['Intuit (QuickBooks)', 'Customer-authorized accounting data access via OAuth'],
          ['HubSpot', 'Customer-authorized CRM data access via OAuth'],
          ['Square', 'Customer-authorized sales data access via OAuth'],
          ['Jobber', 'Customer-authorized field-service jobs data access via OAuth'],
          ['Gusto', 'Customer-authorized payroll data access via OAuth'],
        ],
      },
      {
        type: 'p',
        text: 'Customer-authorized integrations are accessed only with the explicit consent of the customer, who can revoke access at any time from within the app or from the connected platform’s own settings.',
      },
    ],
  },
  {
    heading: '7. Data handling for connected platforms',
    content: [
      {
        type: 'p',
        text: 'When you connect a platform like QuickBooks, HubSpot, or Square to the app:',
      },
      {
        type: 'ul',
        items: [
          'OAuth tokens are encrypted at rest using AES-256-GCM with a key held outside the database, so a stolen database alone does not yield usable credentials.',
          'Tokens are never logged. Error reports sent to our monitoring system have Authorization headers, cookies, and OAuth-shaped query parameters replaced with [Filtered] before transmission.',
          'Customer data is fetched on demand and cached only briefly (up to four hours) to reduce upstream API load. Cached values are deleted on disconnect.',
          'Disconnecting removes the data. When you disconnect a platform, whether from within our app or from the connected platform’s settings, we revoke the OAuth token, null the encrypted token fields, clear cached values, and strip platform-derived numerical blocks from prior chat history. This happens synchronously at the time of disconnect, not on a delay.',
          'Audit log entries for connection lifecycle events (connect, refresh, disconnect) are retained for security and compliance purposes but contain no customer-readable platform data.',
        ],
      },
    ],
  },
  {
    heading: '8. Data retention & deletion',
    content: [
      {
        type: 'p',
        text: `Customer chat history, business profile, and team membership data are retained for the duration of the customer’s account. Customers may request account deletion at any time by emailing ${EMAIL}; we honor deletion requests within 30 days.`,
      },
      {
        type: 'p',
        text: 'Connection-related data tied to a third-party integration (OAuth tokens, cached API responses, platform-derived report blocks in chat) is removed within 30 days of disconnection. In practice this happens synchronously at disconnect time, well before the 30-day limit.',
      },
    ],
  },
  {
    heading: '9. Encryption in transit',
    content: [
      {
        type: 'p',
        text: 'All traffic between customers, our application, and our subprocessors uses TLS 1.2 or higher. The app and marketing site enforce HTTPS via HTTP Strict Transport Security with a two-year max-age, includeSubDomains, and preload directives.',
      },
    ],
  },
  {
    heading: '10. Encryption at rest',
    content: [
      {
        type: 'p',
        text: 'The managed Postgres database operated by Supabase is encrypted at rest using their platform-default disk encryption. On top of that, OAuth access and refresh tokens are encrypted application-side using AES-256-GCM before being persisted; the encryption key is held only in environment configuration on Netlify and is never written to the database.',
      },
    ],
  },
  {
    heading: '11. Access controls',
    content: [
      {
        type: 'p',
        text: `Database, hosting, and OAuth-provider administration accounts require multi-factor authentication. Access to production data is limited to the founder (${FOUNDER_EMAIL}) and is used only for support, incident response, and platform maintenance.`,
      },
    ],
  },
  {
    heading: '12. Updates to this policy',
    content: [
      {
        type: 'p',
        text: 'We may update this page from time to time. Material changes will be reflected in the “Last updated” date above.',
      },
    ],
  },
  {
    heading: '13. Questions',
    content: [
      {
        type: 'ul',
        items: [
          `Security reports: ${SECURITY_EMAIL}`,
          `General contact: ${EMAIL}`,
          `Phone: ${PHONE}`,
        ],
      },
      { type: 'address', lines: POSTAL_ADDRESS },
    ],
  },
]

export default function SecurityPage() {
  return (
    <LegalPage
      testId="security-page"
      title="Security & vulnerability disclosure"
      metaTitle="Security & vulnerability disclosure | Yui"
      description="How to report a security issue to Yui, what to expect, the subprocessors we rely on, and how we handle data on connected platforms."
      path="/security"
      updated="September 2026"
      intro="We take the security of Yui seriously. This page covers how to report a security issue, what to expect when you do, the third-party services we rely on to deliver the product, and how we handle customer data on connected platforms."
      sections={SECTIONS}
    />
  )
}
