import LegalPage from '../components/LegalPage'
import { EMAIL, ENTITY, PHONE, POSTAL_ADDRESS } from '../site'

// Ported from the prior brand's reviewed policy. Only the business name, domain,
// and contact email changed; the SMS-program language, entity, phone number and
// mailing address describe the same operating entity and carried over as-is.
const SECTIONS = [
  {
    heading: '1. Information We Collect',
    content: [
      {
        type: 'p',
        text: 'We collect your phone number only when you voluntarily provide it to us, for example by calling our business phone number, texting us first, submitting a contact or scheduling form on our website, or otherwise opting in to receive messages from us. We may also collect your name, email address, and any details you choose to share about your business or project.',
      },
    ],
  },
  {
    heading: '2. How We Use Your Information',
    content: [
      {
        type: 'p',
        text: 'We use your mobile number specifically to support our consulting engagements with you. This includes:',
      },
      {
        type: 'ul',
        items: [
          'Scheduling and confirming meetings or consultations',
          'Responding to texts you send us',
          'Sending operations and service-related messages',
        ],
      },
      {
        type: 'p',
        text: 'By opting in, you agree to receive conversational, scheduling, and operations/service-related messages from Yui. Message frequency varies. Message and data rates may apply. Reply HELP for help. Reply STOP or CANCEL to opt out.',
      },
      {
        type: 'p',
        text: 'View our Terms and Conditions at https://yuiops.com/terms and our Privacy Policy at https://yuiops.com/privacy.',
      },
    ],
  },
  {
    heading: '3. Website Diagnostics',
    content: [
      {
        type: 'p',
        text: 'Our website offers two free self-serve diagnostics: the Operations Health Check and Find My Bottleneck. Neither asks for your name, email address, or phone number, and neither requires an account.',
      },
      {
        type: 'p',
        text: 'When you finish one, the answers you selected are sent to our own server function, which forwards them to Anthropic’s API so that a Claude model can generate your result. Anthropic processes those answers as our service provider and, under its commercial terms, does not use API inputs to train its models.',
      },
      {
        type: 'p',
        text: 'We do not save your answers once the result has been returned to your browser (there is no database behind either tool), and because we never ask who you are, the answers are not linked to you or to any contact record we hold.',
      },
    ],
  },
  {
    heading: '4. Website Analytics',
    content: [
      {
        type: 'p',
        text: 'We use Google Analytics, a web analytics service provided by Google, to understand how visitors use our website, such as which pages are viewed and how visitors arrive at the site. Google Analytics uses cookies and similar technologies to collect information such as the pages you visit, the time you spend on them, the website that referred you, and general information about your device, browser, and approximate location.',
      },
      {
        type: 'p',
        text: 'To learn how Google collects and processes this data, see “How Google uses information from sites or apps that use our services” at https://policies.google.com/technologies/partner-sites. You can prevent Google Analytics from collecting data about your visits by installing the Google Analytics Opt-out Browser Add-on at https://tools.google.com/dlpage/gaoptout, or by blocking cookies in your browser settings.',
      },
    ],
  },
  {
    heading: '5. Third-Party Sharing',
    content: [
      {
        type: 'p',
        text: 'We do not sell, rent, transfer, or share your personal information, including your mobile number and other contact details, with any external organizations or third parties for any purpose. No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All categories of data described above exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.',
      },
    ],
  },
  {
    heading: '6. Opt-Out & Help',
    content: [
      {
        type: 'p',
        text: `You can cancel the SMS service at any time. Just text “STOP” to ${PHONE}. After you send the SMS message “STOP” to us, we will send you a confirmation message that you have been unsubscribed. You will no longer receive SMS messages from us. If you want to join again, just sign up as you did the first time and we will start sending messages to you again.`,
      },
      {
        type: 'p',
        text: `If you are experiencing issues with the messaging program you can reply with the keyword HELP for more assistance, or you can get help directly at ${EMAIL}.`,
      },
    ],
  },
  {
    heading: '7. Message Frequency & Costs',
    content: [
      {
        type: 'p',
        text: 'Message frequency varies based on your engagement with us. Message and data rates may apply for any messages sent to you from us and to us from you. Please contact your wireless provider for details about your messaging plan.',
      },
    ],
  },
  {
    heading: '8. Carriers',
    content: [
      { type: 'p', text: 'Carriers are not liable for delayed or undelivered messages.' },
    ],
  },
  {
    heading: '9. Data Safeguards',
    content: [
      {
        type: 'p',
        text: 'We maintain internal access controls, employee confidentiality requirements, and administrative, technical, and physical safeguards to prevent unauthorized access, use, sharing, or disclosure of personal information. These protections include internal policies, role-based access controls, secure transmission and storage practices, and written staff handling policies. Only authorized personnel may access user data, including consumer data, and only for approved business purposes related to the services described in this policy.',
      },
    ],
  },
  {
    heading: '10. Changes to This Policy',
    content: [
      {
        type: 'p',
        text: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated “Last updated” date.',
      },
    ],
  },
  {
    heading: 'SMS/Text Messaging',
    content: [
      {
        type: 'p',
        text: 'Mobile opt-in information and consent will not be shared with any third parties or affiliates for marketing or promotional purposes. Message frequency varies. Message and data rates may apply. Reply STOP to opt out at any time, or HELP for assistance.',
      },
    ],
  },
  {
    heading: '11. Contact Us',
    content: [
      {
        type: 'p',
        text: `If you have questions about this Privacy Policy or our SMS program, contact us at ${EMAIL} or ${PHONE}. You can also reach us by mail at:`,
      },
      {
        type: 'address',
        lines: [...POSTAL_ADDRESS, `Phone: ${PHONE}`, `Email: ${EMAIL}`],
      },
      { type: 'p', text: `Yui is a brand operated by ${ENTITY}.` },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      testId="privacy-page"
      title="Privacy policy"
      metaTitle="Privacy policy | Yui"
      description="How Yui collects, uses, and protects the information you share with us by phone, email, web form, or SMS."
      path="/privacy"
      updated="September 2026"
      intro={`This Privacy Policy describes how Yui, a DBA of ${ENTITY} (“we,” “us,” or “our”), collects, uses, and protects information you provide when you interact with us through our website, by phone, by email, or by SMS text message.`}
      sections={SECTIONS}
    />
  )
}
