import LegalPage from '../components/LegalPage'
import { APP_URL, EMAIL, ENTITY, PHONE, POSTAL_ADDRESS } from '../site'

// Ported from the prior brand's reviewed terms. Only the business name, domain,
// app URL, and contact email changed. The EULA below describes a QuickBooks-
// connected web application — if no Yui app is live yet, drop the EULA section.
const SECTIONS = [
  {
    heading: `End User License Agreement (EULA) — Yui Software`,
    content: [
      {
        type: 'p',
        text: `This EULA applies to the Yui web application at ${APP_URL} (the “Software”) and is in addition to the website Terms below.`,
      },
      { type: 'h3', text: 'A. License grant' },
      {
        type: 'p',
        text: 'Subject to your compliance with this EULA, we grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Software solely for your internal business operations as the owner or authorized representative of a single business entity. The Software is licensed, not sold; we retain all right, title, and interest in and to the Software.',
      },
      { type: 'h3', text: 'B. Eligibility and account' },
      {
        type: 'p',
        text: 'You must be at least 18 years old and authorized to act on behalf of the business whose financial data you connect. You are responsible for safeguarding your login credentials and for all activity that occurs under your account. One account per business entity; multi-business support is offered as a separate paid feature.',
      },
      { type: 'h3', text: 'C. Acceptable use' },
      {
        type: 'p',
        text: 'You may not: (i) reverse engineer, decompile, or attempt to derive source code from the Software except as permitted by law; (ii) resell, sublicense, lease, or commercially redistribute access to the Software; (iii) use the Software to develop a competing product; (iv) circumvent rate limits, authentication, or security controls; (v) upload unlawful, infringing, or harmful content; (vi) use automated scraping or extraction methods beyond the documented interfaces; or (vii) use the Software in violation of any applicable law or third-party agreement, including the QuickBooks Online Terms of Service.',
      },
      { type: 'h3', text: 'D. QuickBooks Online integration' },
      {
        type: 'p',
        text: 'The Software integrates with QuickBooks Online via Intuit’s authorized OAuth API. Yui is an independent product and is not affiliated with, endorsed by, or sponsored by Intuit Inc. “QuickBooks” and “Intuit” are trademarks of Intuit Inc.',
      },
      {
        type: 'p',
        text: 'When you connect QuickBooks Online, you authorize us to access your QuickBooks data on a read-only basis (Profit & Loss, AR Aging, Cash Position, Balance Sheet, AP Aging, and Sales by Customer reports). We do not write, modify, or delete any data in your QuickBooks Online account. You may revoke this authorization at any time by clicking “Disconnect QuickBooks” in the Software or by removing the app from your Intuit account at appcenter.intuit.com.',
      },
      {
        type: 'p',
        text: 'OAuth tokens are encrypted at rest using AES-256-GCM with keys held in our application environment (never in the database). Report data may be cached for up to four hours to reduce API load and is deleted within 24 hours of disconnection.',
      },
      { type: 'h3', text: 'E. AI-generated output — not professional advice' },
      {
        type: 'p',
        text: 'The Software uses large language models (“LLMs”) to generate financial analysis, summaries, and recommendations based on data you provide and data retrieved from connected services such as QuickBooks Online. AI outputs may contain errors, omissions, or misinterpretations and must not be relied upon as the sole basis for any business, financial, accounting, tax, legal, or investment decision.',
      },
      {
        type: 'p',
        text: 'The Software does not constitute, and we do not provide, professional accounting, tax, legal, fiduciary, or investment advice. You are responsible for independently verifying any AI-generated output before acting on it and for consulting qualified professionals where appropriate.',
      },
      { type: 'h3', text: 'F. Subscription, fees, and cancellation' },
      {
        type: 'p',
        text: 'Access to the Software may require a paid subscription. Current pricing and billing terms are disclosed at sign-up and on our pricing page. You may cancel your subscription at any time; cancellation takes effect at the end of the then-current billing period and does not entitle you to a refund of fees already paid except as required by applicable law. We may change pricing on a going-forward basis with at least 30 days’ notice to active subscribers.',
      },
      { type: 'h3', text: 'G. Termination' },
      {
        type: 'p',
        text: 'This EULA continues until terminated. You may terminate it at any time by disconnecting QuickBooks Online, cancelling your subscription, and discontinuing use of the Software. We may suspend or terminate your access immediately, with or without notice, if you breach this EULA, if your use creates risk or possible legal exposure for us, or if your account is inactive for an extended period. Upon termination, your right to use the Software ends; sections D, E, and H through L survive termination.',
      },
      { type: 'h3', text: 'H. Software warranties disclaimer' },
      {
        type: 'p',
        text: 'THE SOFTWARE IS PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE. WE SPECIFICALLY DISCLAIM ALL IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF TRADE. We do not warrant that the Software will be uninterrupted, secure, or error-free, or that AI-generated outputs will be accurate, complete, or suitable for any particular purpose.',
      },
      { type: 'h3', text: 'I. Limitation of liability (Software)' },
      {
        type: 'p',
        text: 'To the maximum extent permitted by law, our total cumulative liability arising out of or relating to the Software, this EULA, or your use of AI-generated outputs will not exceed the greater of (a) the fees you paid to us for the Software in the twelve (12) months preceding the event giving rise to the claim, or (b) one hundred U.S. dollars (US $100). In no event will we be liable for indirect, incidental, consequential, special, exemplary, or punitive damages, or for lost profits, lost revenue, lost data, business interruption, or cost of substitute services, even if advised of the possibility of such damages.',
      },
      { type: 'h3', text: 'J. Indemnification' },
      {
        type: 'p',
        text: `You agree to defend, indemnify, and hold harmless Yui, ${ENTITY}, and their officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys’ fees) arising out of or relating to: (i) your breach of this EULA; (ii) your violation of applicable law or third-party rights; (iii) your business or financial decisions made in reliance on AI-generated outputs; or (iv) data you provide to or through the Software.`,
      },
      { type: 'h3', text: 'K. Privacy and data' },
      {
        type: 'p',
        text: 'Your use of the Software is also subject to our Privacy Policy, which describes what we collect, how it is used, and how it is protected. By using the Software you consent to the data practices described there.',
      },
      { type: 'h3', text: 'L. Changes to this EULA; acceptance' },
      {
        type: 'p',
        text: 'We may update this EULA from time to time. Material changes will be communicated by posting the updated EULA on this page with a new “Last updated” date and, where reasonably possible, by notice within the Software. Your continued use of the Software after the effective date of any update constitutes your acceptance of the updated EULA. If you do not agree to an update, your sole remedy is to stop using the Software and disconnect any integrations.',
      },
      {
        type: 'p',
        text: 'By creating an account, clicking “I agree,” connecting QuickBooks Online, or otherwise accessing the Software, you acknowledge that you have read and agree to be bound by this EULA and the Terms and Conditions below.',
      },
    ],
  },
  {
    heading: '1. SMS Program Terms',
    content: [
      {
        type: 'p',
        text: 'By providing your mobile number and checking the SMS opt-in box on our website contact form, by texting us first, or by calling our business phone number, you agree to receive conversational, scheduling, and operations/service-related text messages from Yui at the number you provided.',
      },
      {
        type: 'p',
        text: 'Message frequency varies based on your engagement with us. Message and data rates may apply. Reply HELP for help. Reply STOP or CANCEL at any time to opt out. After you send STOP or CANCEL, we will send you a confirmation message and you will no longer receive SMS messages from us.',
      },
      {
        type: 'p',
        text: 'Mobile opt-in information and consent will not be shared with any third parties or affiliates for marketing or promotional purposes. We do not send marketing or promotional text messages.',
      },
    ],
  },
  {
    heading: '2. Eligibility',
    content: [
      {
        type: 'p',
        text: 'You must be at least 18 years old and the authorized account holder of the mobile number you provide, or have permission from the account holder, to opt in to our SMS program. You agree to provide accurate, current information and to update us if your mobile number changes.',
      },
    ],
  },
  {
    heading: '3. Carriers and Delivery',
    content: [
      {
        type: 'p',
        text: 'Wireless carriers are not liable for delayed or undelivered messages. Message delivery is subject to your carrier’s network availability and your device. Supported carriers include all major U.S. carriers; supported carriers may change without notice.',
      },
    ],
  },
  {
    heading: '4. Use of Our Services',
    content: [
      {
        type: 'p',
        text: 'You agree to use our website, communications, and SMS program only for lawful purposes and consistent with these Terms. You may not use our services to harass, abuse, or impersonate others, to transmit unlawful or harmful content, or in a way that interferes with our systems or other users.',
      },
    ],
  },
  {
    heading: '5. Disclaimer of Warranties',
    content: [
      {
        type: 'p',
        text: 'Our website, services, and SMS program are provided on an “as is” and “as available” basis. To the fullest extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that our services will be uninterrupted, timely, or error-free.',
      },
    ],
  },
  {
    heading: '6. Limitation of Liability',
    content: [
      {
        type: 'p',
        text: `To the fullest extent permitted by law, Yui and ${ENTITY} will not be liable for any indirect, incidental, consequential, special, or punitive damages arising out of or relating to your use of our website, services, or SMS program, including but not limited to message delivery delays or failures.`,
      },
    ],
  },
  {
    heading: '7. Privacy',
    content: [
      {
        type: 'p',
        text: 'Your use of our services is also governed by our Privacy Policy, which describes how we collect, use, and protect your information.',
      },
    ],
  },
  {
    heading: '8. Changes to These Terms',
    content: [
      {
        type: 'p',
        text: 'We may update these Terms from time to time. Any changes will be posted on this page with an updated “Last updated” date. Your continued use of our services after changes are posted constitutes your acceptance of the updated Terms.',
      },
    ],
  },
  {
    heading: '9. Governing Law',
    content: [
      {
        type: 'p',
        text: 'These Terms are governed by the laws of the State of California, without regard to its conflict of laws principles. Any dispute arising out of or relating to these Terms or our services will be resolved in the state or federal courts located in Sacramento County, California.',
      },
    ],
  },
  {
    heading: '10. Contact Us',
    content: [
      {
        type: 'p',
        text: `If you have questions about these Terms or our SMS program, contact us at ${EMAIL} or ${PHONE}. You can also reach us by mail at:`,
      },
      {
        type: 'address',
        lines: [...POSTAL_ADDRESS, `Phone: ${PHONE}`, `Email: ${EMAIL}`],
      },
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      testId="terms-page"
      title="Terms and conditions"
      metaTitle="Terms and conditions | Yui"
      description="The terms that govern use of the Yui website, software, and SMS program."
      path="/terms"
      updated="September 2026"
      intro={`These Terms and Conditions (“Terms”) govern your use of the website, services, software application (as further described in the End User License Agreement below), and SMS text message program offered by Yui, a DBA of ${ENTITY} (“we,” “us,” or “our”). By using our website, the Yui software, contacting us, or opting in to our SMS program, you agree to these Terms.`}
      sections={SECTIONS}
    />
  )
}
