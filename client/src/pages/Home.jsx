import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";

const services = [
  {
    title: "AI consulting for SMEs",
    copy:
      "Strategy and implementation for small and mid-sized firms that need practical AI with measurable commercial outcomes.",
  },
  {
    title: "AI lead generation automation",
    copy:
      "Design AI assistants for websites that qualify inbound demand, enrich context, and route opportunities to sales teams.",
  },
  {
    title: "AI workflow automation",
    copy:
      "Automate repetitive internal processes across support, operations, and delivery with clear governance and monitoring.",
  },
  {
    title: "Knowledge assistants for teams",
    copy:
      "Deploy searchable, source-aware assistants that help teams answer questions faster and improve consistency.",
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
    title: "AI assistants for websites",
    copy: "Capture and qualify website leads before the first human conversation.",
  },
  {
    title: "AI automation for businesses",
    copy: "Reduce manual workload in onboarding, reporting, and repetitive operations.",
  },
  {
    title: "Internal knowledge copilots",
    copy: "Give teams a reliable interface for SOPs, service data, and recurring questions.",
  },
  {
    title: "Lead follow-up acceleration",
    copy: "Improve response quality and speed with structured AI-assisted qualification.",
  },
];

const process = [
  {
    title: "1. Scope",
    copy: "Define goals, constraints, and KPIs tied to growth, efficiency, or lead quality.",
  },
  {
    title: "2. Architect",
    copy: "Design workflows, assistant behavior, integrations, and business safeguards.",
  },
  {
    title: "3. Launch",
    copy: "Deploy production-ready systems with testing, analytics, and team enablement.",
  },
  {
    title: "4. Optimize",
    copy: "Improve performance continuously using usage signals, outcomes, and feedback.",
  },
];

const differentiators = [
  {
    title: "Outcome-driven consulting",
    copy: "Every AI initiative is framed around lead generation, conversion, or operating leverage.",
  },
  {
    title: "Implementation depth",
    copy: "Aethos AI combines strategy, engineering, and delivery without unnecessary overhead.",
  },
  {
    title: "Trusted AI systems",
    copy: "Transparent, maintainable systems designed for long-term business adoption.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <div className="container hero-layout">
          <div className="hero-content">
            <p className="eyebrow">AI Consulting for SMEs</p>
            <h1>AI automation for businesses that need qualified leads and efficient operations.</h1>
            <p className="hero-copy muted">
              Aethos AI builds AI lead generation automation, AI assistants for websites,
              and AI workflow automation for service-led organizations across Europe.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/book">
                Book an AI Consultation
              </Link>
              <Link className="btn btn-secondary" to="/lab">
                Explore AI Playground
              </Link>
            </div>
            <div className="hero-signals">
              <span>Brussels-based</span>
              <span>SME-focused delivery</span>
              <span>Outcome-oriented systems</span>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Value summary">
            <p className="panel-kicker">Business Value</p>
            <h3>Designed to improve lead quality, response speed, and delivery consistency.</h3>
            <div className="panel-list">
              <p>Convert more website traffic into qualified opportunities.</p>
              <p>Automate repetitive workflows without losing operational control.</p>
              <p>Scale internal knowledge access with reliable AI assistants.</p>
            </div>
            <div className="panel-metrics">
              <div>
                <strong>30d</strong>
                <span>Typical pilot delivery</span>
              </div>
              <div>
                <strong>3x</strong>
                <span>Faster team response</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Services"
            title="AI consulting services built for measurable outcomes"
            description="From strategy to production, each engagement is structured around ROI, adoption, and operational clarity."
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
            eyebrow="Industries"
            title="Built for service businesses and high-trust environments"
            description="Aethos AI supports teams that need credible AI implementation with practical business impact."
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
            title="Common AI automation wins for businesses"
            description="These are the most frequent entry points for AI consulting for SMEs and services organizations."
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
            eyebrow="Process"
            title="A clear path from business objective to AI deployment"
            description="Delivery follows a structured model focused on speed, quality, and long-term value."
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
            title="AI consulting with implementation rigor"
            description="Aethos AI combines strategic advisory and technical execution for real business outcomes."
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
            <h2>Ready to deploy AI automation in your business?</h2>
            <p className="muted">
              Request a consultation to identify the highest-impact AI assistants,
              workflows, and lead-generation opportunities for your team.
            </p>
          </div>
          <Link className="btn btn-primary" to="/book">
            Request Your Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
