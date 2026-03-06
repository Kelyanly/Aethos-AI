import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";

const services = [
  {
    title: "AI Assistants for Lead Capture",
    copy:
      "Deploy assistants that qualify inbound interest, gather intent, and route opportunities to the right sales owner.",
  },
  {
    title: "Knowledge Assistants",
    copy:
      "Give teams and clients reliable access to your expertise through source-grounded, business-aware assistants.",
  },
  {
    title: "Workflow Automation",
    copy:
      "Automate repetitive delivery and operations tasks across CRM, support, and service workflows with clear controls.",
  },
  {
    title: "Tailored AI Systems",
    copy:
      "Design bespoke AI solutions around your constraints, stack, and service model for measurable business impact.",
  },
];

const industries = [
  "Professional Services",
  "Consulting Firms",
  "B2B Agencies",
  "Financial Services",
  "SMEs",
  "Public Programs",
];

const useCases = [
  {
    title: "Lead qualification and handoff",
    copy: "Prioritize high-intent prospects and shorten your sales response cycle.",
  },
  {
    title: "Client onboarding acceleration",
    copy: "Capture requirements and documents faster while reducing onboarding friction.",
  },
  {
    title: "Service delivery copilots",
    copy: "Support teams with contextual recommendations and faster access to internal know-how.",
  },
  {
    title: "Knowledge-powered support",
    copy: "Answer recurring questions consistently with transparent, up-to-date information.",
  },
];

const process = [
  {
    title: "1. Scope",
    copy: "Define the opportunity, constraints, and success metrics with stakeholders.",
  },
  {
    title: "2. Architect",
    copy: "Design the assistant, integrations, and governance model for your business context.",
  },
  {
    title: "3. Launch",
    copy: "Ship a production-ready implementation with quality controls and clear ownership.",
  },
  {
    title: "4. Scale",
    copy: "Iterate based on real usage data and extend automation to adjacent workflows.",
  },
];

const differentiators = [
  {
    title: "Business-first execution",
    copy: "Every build is tied to concrete commercial or operational outcomes.",
  },
  {
    title: "Premium implementation quality",
    copy: "Clean architecture, reliable UX, and disciplined delivery standards.",
  },
  {
    title: "Trust-ready systems",
    copy: "Transparent behavior, guardrails, and governance designed for professional environments.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <div className="container hero-layout">
          <div className="hero-content">
            <p className="eyebrow">AI Consulting for Service Businesses</p>
            <h1>AI assistants that generate qualified demand and scale delivery capacity.</h1>
            <p className="hero-copy muted">
              Aethos AI helps SMEs and service firms deploy practical AI systems for lead
              capture, knowledge delivery, and workflow automation without unnecessary complexity.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/book">
                Request Consultation
              </Link>
              <a className="btn btn-secondary" href="#services">
                Explore Services
              </a>
            </div>
            <div className="hero-signals">
              <span>Brussels-based</span>
              <span>EU delivery</span>
              <span>Conversion-oriented</span>
            </div>
          </div>

          <aside className="hero-panel">
            <p className="panel-kicker">Strategic Value</p>
            <h3>Designed to improve revenue velocity and operational consistency.</h3>
            <div className="panel-list">
              <p>Lead assistants that qualify and route opportunities automatically.</p>
              <p>Knowledge copilots that reduce internal response time.</p>
              <p>Automation layers that eliminate repetitive delivery tasks.</p>
            </div>
            <div className="panel-metrics">
              <div>
                <strong>30d</strong>
                <span>Typical pilot window</span>
              </div>
              <div>
                <strong>4x</strong>
                <span>Faster internal answers</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Core Services"
            title="Consulting-grade offers with implementation depth"
            description="Each engagement is scoped around one clear objective and delivered with production-level standards."
          />
          <div className="cards-grid">
            {services.map((service) => (
              <article key={service.title} className="surface-card">
                <h3>{service.title}</h3>
                <p className="muted">{service.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="section section-alt">
        <div className="container">
          <SectionHeader
            eyebrow="Target Clients"
            title="Built for high-trust service environments"
            description="Aethos AI partners with organizations where clarity, reliability, and speed matter."
          />
          <div className="pill-grid">
            {industries.map((industry) => (
              <span key={industry} className="pill-item">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Use Cases"
            title="Practical entry points with measurable value"
            description="These are the most common first deployments for service-led teams."
          />
          <div className="cards-grid compact-grid">
            {useCases.map((item) => (
              <article key={item.title} className="surface-card compact">
                <h3>{item.title}</h3>
                <p className="muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="section section-alt">
        <div className="container">
          <SectionHeader
            eyebrow="How It Works"
            title="A clear path from initial scope to production"
            description="Delivery follows a focused process that balances speed with long-term system quality."
          />
          <div className="process-grid">
            {process.map((step) => (
              <article key={step.title} className="process-card">
                <h3>{step.title}</h3>
                <p className="muted">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why-aethos" className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Why Aethos AI"
            title="A delivery partner focused on credible outcomes"
            description="Execution quality and business relevance are treated as first-order priorities."
          />
          <div className="cards-grid">
            {differentiators.map((item) => (
              <article key={item.title} className="surface-card">
                <h3>{item.title}</h3>
                <p className="muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="container final-cta-layout">
          <div>
            <h2>Ready to turn AI into a business advantage?</h2>
            <p className="muted">
              Share your context and goals. You will receive an actionable consultation
              response with proposed next steps.
            </p>
          </div>
          <Link className="btn btn-primary" to="/book">
            Book Your Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
