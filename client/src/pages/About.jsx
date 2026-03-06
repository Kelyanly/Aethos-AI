import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";

export default function About() {
  return (
    <main>
      <Seo
        title="About Aethos AI | AI Consulting for SMEs"
        description="Aethos AI helps service companies deploy practical AI assistants for lead capture, knowledge access, and workflow automation."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>About Aethos AI</h1>
          <p className="hero-copy muted">
            Aethos AI helps service companies deploy practical AI assistants that automate repetitive
            operational workflows.
          </p>
          <div className="page-intro-block">
            <p>
              We focus on business-first implementation: clear use cases, short pilots, measurable
              outcomes, and reliable integration into existing systems.
            </p>
            <ul className="content-list">
              <li>AI lead capture and qualification systems.</li>
              <li>AI knowledge assistants for internal and customer-facing teams.</li>
              <li>Workflow automation for repetitive operational processes.</li>
            </ul>
            <p>Brussels, Belgium - serving EU clients.</p>
          </div>
        </div>
      </ScrollRevealSection>
    </main>
  );
}
