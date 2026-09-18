import NameCard from './NameCard'

// Sits directly under the hero so the name is explained before anything
// transactional. The card itself is shared with the About page.
export default function NameStory() {
  return (
    <section id="name" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <NameCard className="max-w-3xl" />
      </div>
    </section>
  )
}
