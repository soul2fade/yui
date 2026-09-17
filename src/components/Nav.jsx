import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Wordmark from './Wordmark'
import { BOOKING_HREF, NAV_LINKS } from '../site'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile sheet whenever a link navigates.
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-8"
      >
        <Link to="/" onClick={close} aria-label="Yui — home">
          <Wordmark />
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`text-[0.9375rem] transition-colors hover:text-ink ${
                  pathname === link.href ? 'text-ink' : 'text-muted'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link to={BOOKING_HREF} className="btn btn-accent hidden sm:inline-flex">
            Book a fit call
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="btn btn-outline-ink px-4 md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-paper md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-2 sm:px-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-line last:border-0">
                <Link
                  to={link.href}
                  onClick={close}
                  className="block py-3.5 text-[0.9375rem] text-muted"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-6xl px-6 pb-5 sm:hidden sm:px-8">
            <Link to={BOOKING_HREF} onClick={close} className="btn btn-accent w-full">
              Book a fit call
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
