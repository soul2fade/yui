import { Link } from 'react-router-dom'
import { BOOKING_HREF, CREDENTIALS, TESTIMONIAL } from '../site'

// The athletic director's reference, read from TESTIMONIAL in site.js. A figure
// with a blockquote and figcaption, so the quote and the person who said it are
// tied together for screen readers as well as on screen. The quote renders in
// full; see the rules beside TESTIMONIAL before changing it.
export function Testimonial({ className = '' }) {
  const { quote, name, title, organization } = TESTIMONIAL
  return (
    <figure className={`card p-6 sm:p-10 ${className}`}>
      <span
        aria-hidden="true"
        className="block text-5xl leading-none text-accent"
        style={{ fontWeight: 600 }}
      >
        &ldquo;
      </span>
      <blockquote className="mt-2">
        <p className="text-lg leading-relaxed text-ink">{quote}</p>
      </blockquote>
      <figcaption className="mt-8 border-t border-line pt-6">
        <p className="text-[0.9375rem] text-ink" style={{ fontWeight: 600 }}>
          {name}
        </p>
        <p className="mono mt-2 text-muted">
          {title}, {organization}
        </p>
      </figcaption>
    </figure>
  )
}

// Mono eyebrow: Geist Mono, uppercase, 0.12em tracking, 11px.
export function Eyebrow({ children, tone = 'accent', className = '' }) {
  const color =
    tone === 'paper' ? 'text-muted-dark' : tone === 'muted' ? 'text-muted' : 'text-accent'
  return <p className={`mono ${color} ${className}`}>{children}</p>
}

// Headline with the closing period in accent. Pass text without the period.
export function Headline({ as: Tag = 'h2', children, className = '' }) {
  return (
    <Tag className={`headline ${className}`}>
      {children}
      <span className="period">.</span>
    </Tag>
  )
}

export function Stat({ figure, label, detail }) {
  return (
    <div className="card p-6">
      <div
        className="text-3xl sm:text-4xl text-ink"
        style={{ fontWeight: 600, letterSpacing: '-0.04em' }}
      >
        {figure}
      </div>
      <p className="mt-3 text-[0.9375rem] text-ink leading-snug">{label}</p>
      <p className="mono text-muted mt-2">{detail}</p>
    </div>
  )
}

// Credentials, read from CREDENTIALS in site.js so the wording lives in one
// place. Two shapes:
//
// variant="list" is the About block: each credential on its own line with its
// issuer. Where a verification page exists, the credential's own name is the
// link to it, rather than a separate "Verify" call to action, which reads as
// though the claim expects to be doubted. A claim a visitor can check is worth
// far more than a claim they cannot, so the link itself stays.
//
// variant="inline" is the footer: the short names on one quiet mono line, no
// links, so it reads as a signature rather than a second pitch.
//
// tone="paper" is for dark surfaces (the footer); the default is for light.
export function Credentials({ variant = 'list', tone = 'ink', className = '' }) {
  const dark = tone === 'paper'

  if (variant === 'inline') {
    return (
      <p className={`mono ${dark ? 'text-muted-dark' : 'text-muted'} ${className}`}>
        {CREDENTIALS.map((c) => c.short).join(' · ')}
      </p>
    )
  }

  return (
    <div className={className}>
      <Eyebrow tone={dark ? 'paper' : 'accent'}>Credentials</Eyebrow>
      <ul className="mt-4 space-y-2.5">
        {CREDENTIALS.map((c) => (
          <li
            key={c.name}
            className={`text-[0.9375rem] leading-relaxed ${dark ? 'text-muted-dark' : 'text-muted'}`}
          >
            {c.verify ? (
              <a
                href={c.verify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
              >
                {c.name}
              </a>
            ) : (
              c.name
            )}
            {c.issuer && `, ${c.issuer}`}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Internal links and external links look the same but behave differently.
export function ButtonLink({ href, variant = 'accent', children, className = '' }) {
  const cls = `btn btn-${variant} ${className}`
  const isInternal = href.startsWith('/') && !href.startsWith('//')
  if (isInternal) {
    return (
      <Link to={href} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  )
}

// The fit-call CTA. BOOKING_HREF may be an external scheduler or an internal
// path, and those need different elements: react-router's Link cannot navigate
// off-site, so an absolute URL has to render as a plain anchor.
export function BookingLink({ variant = 'accent', className = '', onClick, children }) {
  const cls = `btn btn-${variant} ${className}`.trim()
  const isExternal = /^https?:\/\//.test(BOOKING_HREF)

  if (isExternal) {
    return (
      <a
        href={BOOKING_HREF}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={cls}
      >
        {children}
      </a>
    )
  }
  return (
    <Link to={BOOKING_HREF} onClick={onClick} className={cls}>
      {children}
    </Link>
  )
}
