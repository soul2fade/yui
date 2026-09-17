import LegalPage from '../components/LegalPage'
import { EMAIL } from '../site'

// NOTE: baseline policy copy. Have counsel review it before launch and update
// the "Last updated" date when they do.
const SECTIONS = [
  {
    heading: 'What we collect',
    paragraphs: [
      'When you send us a message through the contact form, we collect the name, email address, business name, and message you type into it. That is the only personal information we ask for.',
      'Our free diagnostics — the Operations Health Check and Find My Bottleneck — do not ask for your email or any identifying detail, and we do not require an account to use them. The answers you select are sent to our server so a result can be generated, and we do not attach them to you.',
      'Like most websites, our host records standard server logs (IP address, browser type, pages requested) for security and reliability purposes.',
    ],
  },
  {
    heading: 'How we use it',
    paragraphs: [
      'We use what you send us to reply to you, to schedule a call, and to carry out work you have engaged us for. That is it.',
      'We do not sell personal information. We do not share it with advertisers, and we do not add you to a marketing list because you filled in a contact form.',
    ],
  },
  {
    heading: 'Service providers',
    paragraphs: [
      'This site is hosted on Netlify, which processes form submissions and server logs on our behalf. Our diagnostics send your quiz answers to Anthropic’s API to generate a result; those requests do not include your name, email, or any identifier we hold.',
      'Each of these providers processes data under its own terms, and we only pass along what a given feature needs to function.',
    ],
  },
  {
    heading: 'Cookies and analytics',
    paragraphs: [
      'We do not set advertising or tracking cookies on this site, and we do not run third-party ad pixels.',
    ],
  },
  {
    heading: 'How long we keep it',
    paragraphs: [
      'We keep contact-form messages for as long as we may need them for the conversation or engagement they relate to, and then we delete them. You can ask us to delete yours sooner.',
    ],
  },
  {
    heading: 'Your choices',
    paragraphs: [
      `Email ${EMAIL} to ask what we hold about you, to correct it, or to have it deleted. Depending on where you live you may have a legal right to those things; we will honour the request either way.`,
    ],
  },
  {
    heading: 'Changes',
    paragraphs: [
      'If we change this policy we will update the date at the top of this page. Material changes will be described here rather than made quietly.',
    ],
  },
  {
    heading: 'Contact',
    paragraphs: [`Questions about privacy go to ${EMAIL}.`],
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      testId="privacy-page"
      title="Privacy policy"
      metaTitle="Privacy policy | Yui"
      description="What Yui collects, how we use it, who processes it, and how to have it deleted."
      path="/privacy"
      updated="September 2026"
      intro="Short version: we collect what you send us, we use it to talk to you and do the work, and we do not sell it."
      sections={SECTIONS}
    />
  )
}
