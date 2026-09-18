import { Eyebrow } from './ui'

// The name story, told short and told early. The long version is on the About
// page. Voice is "we" here, like every homepage section except About.
export default function NameStory() {
  return (
    <section id="name" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <div className="max-w-3xl">
          <Eyebrow>The name</Eyebrow>

          <h2 className="headline mt-5 text-3xl text-ink sm:text-4xl">
            Yui <span className="font-mono text-[0.5em] tracking-[0.12em] text-muted">
              (YOO-ee)
            </span>{' '}
            is an old Japanese practice where neighbors pitched in on each
            other&rsquo;s work<span className="period">.</span>
          </h2>

          <p className="mt-7 text-lg leading-relaxed text-muted">
            A roof to re-thatch, a field to harvest, a house to raise. Nobody invoiced
            anybody. You showed up because the help would come back around when it was your
            turn.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink">
            That is the standard we try to hold: your operation treated like the outcome is
            partly ours, because in practice it is.
          </p>
        </div>
      </div>
    </section>
  )
}
