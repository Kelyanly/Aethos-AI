import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";

const services = [
  {
    title: "AI Assistants for Lead Capture",
    copy:
      "Deploy conversational assistants that qualify visitors, capture intent, and hand off the right opportunities to your team.",
  },
  {
    title: "Knowledge Assistants",
    copy:
      "Transform internal documentation into a secure, source-aware assistant that gives precise answers to staff and clients.",
  },
  {
    title: "Workflow Automation",
    copy:
      "Automate repetitive operational tasks across CRM, support, and delivery workflows with reliability and oversight.",
  },
  {
    title: "Tailored AI Solutions",
    copy:
      "Design and implement custom AI systems aligned with your business model, constraints, and growth priorities.",
  },
];

const industries = [
  "Professional Services",
  "SMEs",
  "Consulting Firms",
  "Agencies",
  "Financial Services",
  "Public Sector Programs",
];

const useCases = [
  {
    title: "Inbound lead qualification",
    copy: "Filter and prioritize prospects before the first sales call.",
  },
  {
    title: "Client onboarding copilots",
    copy: "Speed up onboarding with guided data collection and document checks.",
  },
  {
    title: "Operations assistants",
    copy: "Reduce manual admin load with role-specific assistants for internal teams.",
  },
  {
    title: "Knowledge-based support",
    copy: "Answer recurring client questions with controlled, up-to-date information.",
  },
];

const process = [
  {
    title: "1. Audit",
    copy: "Map goals, constraints, data, and bottlenecks to define the highest-impact AI scope.",
  },
  {
    title: "2. Design",
    copy: "Create architecture and user flows focused on measurable outcomes and adoption.",
  },
  {
    title: "3. Build",
    copy: "Implement the assistant or automation stack with integrations and safety controls.",
  },
  {
    title: "4. Optimize",
    copy: "Track performance, improve prompts and flows, and scale what works.",
  },
];

const differentiators = [
  {
    title: "Consulting-grade execution",
    copy: "Clear scope, clean delivery, and decision-ready reporting for business leaders.",
  },
  {
    title: "Conversion-focused systems",
    copy: "Every solution is designed to improve lead quality, response time, and operational throughput.",
  },
  {
    title: "Built for trust",
    copy: "Strong governance, human oversight, and transparent behavior in production use.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <div className="container hero-layout">
          <div>
            <p className="eyebrow">Premium AI Consulting for SMEs</p>
            <h1>Build AI assistants that convert demand into qualified opportunities.</h1>
            <p className="hero-copy muted">
              Aethos AI helps service businesses deploy practical AI for lead capture,
              knowledge delivery, and workflow automation. Focused systems, measurable
              outcomes, and implementation quality you can trust.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/book">
                Request Consultation
              </Link>
              <a className="btn btn-secondary" href="#services">
                View Services
              </a>
            </div>
            <div className="hero-signals muted">
              <span>Brussels-based</span>
              <span>EU-focused delivery</span>
              <span>Conversion-oriented</span>
            </div>
          </div>

          <aside className="hero-panel">
            <p className="panel-title">What this website can do for your business</p>
            <ul>
              <li>Capture and qualify inbound leads automatically</li>
              <li>Answer recurring client questions with verified sources</li>
              <li>Automate repetitive workflows across key teams</li>
              <li>Provide an AI roadmap grounded in business outcomes</li>
            </ul>
          </aside>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Core Services"
            title="Designed for implementation, not slide decks"
            description="Each engagement is scoped around a clear business objective and a production-ready outcome."
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
            title="Built for service-led organizations"
            description="Aethos AI is optimized for teams that need practical AI systems with real ROI and strong credibility."
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
            title="Where clients typically start"
            description="High-value entry points that improve conversion, responsiveness, and team productivity."
          />
          <div className="cards-grid">
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
            title="A structured path from idea to deployment"
            description="A clear operating model that keeps execution fast and risk controlled."
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
            title="A partner focused on outcomes"
            description="The engagement is built to create confidence internally while producing visible business gains."
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
            <h2>Ready to scope your AI initiative?</h2>
            <p className="muted">
              Share your context and goals. You will receive a practical recommendation
              with next steps tailored to your business.
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
