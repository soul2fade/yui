import { Eyebrow } from './ui'

// The name story, on ink so it reads as a definition rather than another block
// of marketing copy. Used on the homepage and again on the About page, so the
// wording exists in exactly one place.
//
// Voice: this speaks as "I", like the About section it sits alongside.
//
// tone="paper" is the card sitting on a light background, so it supplies its own
// ink fill. tone="ink" is the card sitting on the dark hero, where a solid ink
// fill would be invisible, so it uses the lifted card-dark surface instead.
export default function NameCard({ className = '', tone = 'paper' }) {
  const surface = tone === 'ink' ? 'card-dark' : 'rounded-[20px] bg-ink'
  return (
    <div className={`${surface} p-8 text-white sm:p-10 ${className}`}>
      <Eyebrow tone="paper">The name</Eyebrow>
      <h2
        className="mt-5 text-2xl text-white sm:text-3xl"
        style={{ fontWeight: 600, letterSpacing: '-0.03em' }}
      >
        Yui <span className="text-muted-dark">(YOO-ee)</span>
      </h2>
      <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-dark">
        <p>
          Yui is an old Japanese practice where neighbors traded labor: a roof to mend,
          a field to harvest, a house to build. Nobody invoiced anybody. You showed up
          because the help would come back around when it was your turn.
        </p>
        <p>
          That is the standard I am trying to hold. Not a vendor relationship, and not
          charity either. It is showing up like the outcome is partly mine, because in
          practice it is.
        </p>
      </div>
    </div>
  )
}
