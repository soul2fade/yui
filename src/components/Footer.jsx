import { Link } from 'react-router-dom'
import Wordmark from './Wordmark'
import { Credentials } from './ui'
import { EMAIL, LOCATION } from '../site'

const FOOTER_LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Security', href: '/security' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link to="/" aria-label="Yui, home">
              <Wordmark tone="paper" />
            </Link>
            <ul className="mt-5 space-y-1.5 text-[0.9375rem] text-muted-dark">
              <li>
                <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-white">
                  {EMAIL}
                </a>
              </li>
              <li>{LOCATION}</li>
            </ul>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[0.9375rem] text-muted-dark transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-muted-dark">© 2026 Yui</p>
          <Credentials variant="inline" tone="paper" />
        </div>
      </div>
    </footer>
  )
}
