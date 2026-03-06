import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";

const stack = [
  "Website / Chat entry points",
  "ChatHive conversational AI layer",
  "Business logic + qualification policies",
  "Workflow automation orchestration",
  "CRM, knowledge base, and reporting systems",
];

export default function Architecture() {
  return (
    <main>
      <Seo
        title="AI Systems Architecture | Aethos AI"
        description="Typical AI architecture used by Aethos AI for lead capture, workflow automation, and knowledge assistants."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>AI Systems Architecture</h1>
          <p className="hero-copy muted">
            A practical architecture pattern for deploying AI assistants in service businesses.
          </p>
          <div className="page-intro-block">
            <p>
              This reference architecture shows how AI assistants for websites connect with workflow
              automation and core business systems in production conditions.
            </p>
            <ul className="content-list">
              <li>Front-end conversation layer for lead and support interactions.</li>
              <li>Qualification and policy logic for controlled assistant behavior.</li>
              <li>Structured handoff to CRM, knowledge systems, and reporting tools.</li>
            </ul>
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container architecture-flow">
          {stack.map((item, index) => (
            <div key={item} className="architecture-node">
              <span className="architecture-index">{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </ScrollRevealSection>
    </main>
  );
}
