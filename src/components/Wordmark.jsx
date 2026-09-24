// "Yui" in Geist 600 with the ring mark to its left. The mark is two 270-degree
// arcs: one always accent green, the other inherits currentColor so the lockup
// flips correctly on dark surfaces (tone="paper").
export default function Wordmark({ tone = 'ink', className = '' }) {
  const tint = tone === 'paper' ? 'text-white' : 'text-ink'
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        aria-hidden="true"
        viewBox="8 8 84 84"
        width="26"
        height="26"
        className={`block ${tint}`}
        fill="none"
        strokeLinecap="round"
        strokeWidth="13"
      >
        <path d="M 40 62 A 22 22 0 1 1 62 40" stroke="#187D6D" />
        <path d="M 60 38 A 22 22 0 1 1 38 60" stroke="currentColor" />
      </svg>
      <span
        className={`text-[1.375rem] leading-none ${tint}`}
        style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
      >
        Yui
      </span>
    </span>
  )
}