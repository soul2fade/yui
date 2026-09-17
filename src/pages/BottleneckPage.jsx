import Meta from '../components/Meta'
import BottleneckFinder from '../components/quiz/BottleneckFinder'

export default function BottleneckPage() {
  return (
    <div data-testid="bottleneck-page">
      <Meta
        title="Find My Bottleneck — free 5-question diagnostic | Yui"
        description="Five questions and we name the one constraint holding your operation up, plus one concrete thing you can do about it this week. No email required."
        path="/bottleneck"
      />
      <BottleneckFinder />
    </div>
  )
}
