import Meta from '../components/Meta'
import Hero from '../components/Hero'
import Problem from '../components/Problem'
import DiagnosticPromo from '../components/DiagnosticPromo'
import Services from '../components/Services'
import HowItWorks from '../components/HowItWorks'
import Work from '../components/Work'
import Pricing from '../components/Pricing'
import AboutSection from '../components/AboutSection'
import ClosingCTA from '../components/ClosingCTA'

export default function HomePage() {
  return (
    <div data-testid="home-page">
      <Meta
        title="Yui: Operations management and workflow builds for Sacramento businesses"
        description="Keep your tools. Lose the busywork. Fractional operations leadership and hands-on workflow builds for Sacramento-area businesses, built on the software you already pay for."
        path="/"
      />
      <Hero />
      <Problem />
      <DiagnosticPromo />
      <Services />
      <HowItWorks />
      <Work />
      <Pricing />
      <AboutSection />
      <ClosingCTA />
    </div>
  )
}
