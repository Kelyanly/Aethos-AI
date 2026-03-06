import Seo from "../components/Seo.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";
import ArchitectureTooltip from "../components/ArchitectureTooltip.jsx";

const examples = [
  "Lead qualification assistant",
  "Customer support chatbot",
  "Internal knowledge assistant",
  "Appointment scheduling assistant",
];

export default function Agents() {
  return (
    <main>
      <Seo
        title="AI Agents for Business Automation | Aethos AI"
        description="Learn how Aethos AI deploys ChatHive-powered AI agents for lead qualification, customer support, internal knowledge, and scheduling automation."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>AI Agents for Business Automation</h1>
          <p className="hero-copy muted">
            Aethos AI designs and deploys conversational AI agents that improve lead flow,
            support quality, and team productivity.
          </p>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container">
          <SectionHeader
            title="What is an AI agent"
            description="An AI agent is a goal-oriented software assistant that understands requests, uses business knowledge, and takes actions across connected tools."
          />
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section">
        <div className="container">
          <SectionHeader
            title="How conversational AI works"
            description="Conversational AI combines language understanding, workflow logic, and business context to deliver useful responses and actions in real time."
          />
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container">
          <SectionHeader
            title="How ChatHive agents are deployed"
            description="Aethos AI uses ChatHive as a conversational layer, then connects agents to CRM systems, internal knowledge, and workflow automations."
          />
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section">
        <div className="container">
          <SectionHeader
            title="Example business use cases"
            description="Common agents used in AI consulting for SMEs and service businesses."
          />
          <div className="cards-grid compact-grid">
            {examples.map((item) => (
              <article key={item} className="surface-card compact interactive-card">
                <ArchitectureTooltip copy="Data sources + intent model + action workflow." />
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </ScrollRevealSection>
    </main>
  );
}
