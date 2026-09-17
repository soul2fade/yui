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
        title="Yui — AI integrations and operations management for small business"
        description="Yui is the operator your business is missing. AI integrations, operations management, and automation builds for small businesses. Based in Sacramento."
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
