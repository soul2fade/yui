import { Link } from 'react-router-dom'

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
