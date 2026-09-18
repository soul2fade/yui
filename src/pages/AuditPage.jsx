import Meta from '../components/Meta'
import OpsHealthCheck from '../components/quiz/OpsHealthCheck'

export default function AuditPage() {
  return (
    <div data-testid="audit-page">
      <Meta
        title="Operations Health Check: a free 10-question diagnostic | Yui"
        description="Ten questions about how your business runs today. Get an operations score, the hours a week you are losing to manual work, and the gaps causing it. No email required."
        path="/audit"
      />
      <OpsHealthCheck />
    </div>
  )
}
