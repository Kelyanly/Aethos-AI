import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";
import Seo from "../components/Seo.jsx";

const aiSystems = [
  {
    title: "AI Lead Generation Systems",
    copy: "AI assistants that qualify website visitors and capture leads automatically.",
  },
  {
    title: "AI Knowledge Assistants",
    copy: "Internal AI search assistants connected to company knowledge bases.",
  },
  {
    title: "AI Workflow Automation",
    copy: "Automation of repetitive processes across operations.",
  },
  {
    title: "AI Readiness Audit",
    copy: "Assessment of company processes to identify AI opportunities.",
  },
  {
    title: "AI Strategy & Roadmap",
    copy: "Structured plan for AI adoption aligned with business goals.",
  },
];

const chatHiveAgents = [
  "Lead qualification assistant",
  "Customer support AI agent",
  "Internal knowledge assistant",
  "Appointment scheduling assistant",
];

const implementations = [
  {
    title: "Lead capture assistant for service businesses",
    outcome: "More qualified leads and faster response timing.",
  },
  {
    title: "Internal knowledge assistant for teams",
    outcome: "Reduced response time and better consistency.",
  },
  {
    title: "Customer support automation AI",
    outcome: "Less repetitive work and stronger support coverage.",
  },
];

const chatPrompts = [
  {
    prompt: "What services does Aethos AI offer?",
    expected:
      "Explain AI lead generation, knowledge assistants, workflow automation, AI audits, and strategy.",
  },
  {
    prompt: "I run a 10-person marketing agency and want to automate lead capture.",
    expected: "Suggest a lead qualification AI assistant.",
  },
  {
    prompt: "Do you build AI assistants using ChatHive?",
    expected: "Explain ChatHive-powered agents and use cases.",
  },
  {
    prompt: "I want to book a consultation.",
    expected: "Guide the user toward the booking page.",
  },
  {
    prompt: "Bonjour, proposez-vous des agents IA pour qualifier les leads ?",
    expected: "Respond correctly in French and describe lead qualification agents.",
  },
];

export default function Home() {
  return (
    <main>
      <Seo
        title="AI Consulting for SMEs | Aethos AI"
        description="Aethos AI helps service businesses deploy practical AI assistants for lead capture, knowledge access, and workflow automation."
      />

      <section className="hero-section">
        <div className="container hero-layout">
          <div className="hero-content">
            <p className="eyebrow">AI Consulting for SMEs</p>
            <h1>AI automation for businesses that need qualified leads and scalable operations.</h1>
            <p className="hero-copy muted">
              Aethos AI delivers AI lead generation automation, AI assistants for websites,
              and AI workflow automation with practical implementation quality.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/book">
                Book a Consultation
              </Link>
              <Link className="btn btn-secondary" to="/agents">
                Explore AI Solutions
              </Link>
            </div>
            <div className="hero-signals">
              <span>AI consulting for SMEs</span>
              <span>ChatHive-powered agents</span>
              <span>Business-first implementation</span>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Value summary">
            <p className="panel-kicker">Consulting Focus</p>
            <h2>Deploy practical AI systems that improve lead quality and operational speed.</h2>
            <div className="panel-list">
              <p>AI assistants for websites that capture and qualify leads.</p>
              <p>AI automation for businesses with repetitive service workflows.</p>
              <p>AI knowledge assistants connected to internal documentation.</p>
            </div>
            <div className="panel-metrics">
              <div>
                <strong>30d</strong>
                <span>Typical pilot delivery</span>
              </div>
              <div>
                <strong>42%</strong>
                <span>Average automation potential</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" id="chathive-agents">
        <div className="container">
          <SectionHeader
            eyebrow="ChatHive Positioning"
            title="AI Agents powered by ChatHive"
            description="Aethos AI deploys conversational AI agents that capture and qualify leads, answer customer questions, automate repetitive workflows, integrate with CRM systems, and connect to internal knowledge bases."
          />
          <div className="cards-grid compact-grid">
            {chatHiveAgents.map((agent) => (
              <article key={agent} className="surface-card compact">
                <h3>{agent}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="services">
        <div className="container">
          <SectionHeader
            eyebrow="Services"
            title="AI Systems We Build"
            description="A complete consulting offer from AI readiness to production deployment."
          />
          <div className="cards-grid">
            {aiSystems.map((service) => (
              <article key={service.title} className="surface-card">
                <h3>{service.title}</h3>
                <p className="muted">{service.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="implementations">
        <div className="container">
          <SectionHeader
            eyebrow="Credibility"
            title="Example AI Implementations"
            description="Representative outcomes from AI consulting for SMEs and service-led organizations."
          />
          <div className="cards-grid compact-grid">
            {implementations.map((item) => (
              <article key={item.title} className="surface-card compact">
                <h3>{item.title}</h3>
                <p className="muted">{item.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="chat-prompts">
        <div className="container">
          <SectionHeader
            eyebrow="Demo Readiness"
            title="Chat Assistant Demo Prompts"
            description="Use these prompts in the ChatHive widget during presentations and live demos."
          />
          <div className="cards-grid">
            {chatPrompts.map((item) => (
              <article key={item.prompt} className="surface-card">
                <h3>{item.prompt}</h3>
                <p className="muted"><strong>Expected behavior:</strong> {item.expected}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="container final-cta-layout">
          <div>
            <h2>Ready to discuss your AI opportunities?</h2>
            <p className="muted">
              Start with a practical consultation to identify where AI assistants and workflow automation can deliver measurable ROI.
            </p>
          </div>
          <Link className="btn btn-primary" to="/book">
            Book a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
