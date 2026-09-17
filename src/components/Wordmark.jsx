// "Yui" in Geist 600 with an 11px accent square to its left.
export default function Wordmark({ tone = 'ink', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className="block bg-accent"
        style={{ width: 11, height: 11, borderRadius: 3 }}
      />
      <span
        className={`text-[1.375rem] leading-none ${tone === 'paper' ? 'text-white' : 'text-ink'}`}
        style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
      >
        Yui
      </span>
    </span>
  )
}
