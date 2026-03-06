import { useState } from "react";
import Seo from "../components/Seo.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";
import ArchitectureTooltip from "../components/ArchitectureTooltip.jsx";
import InteractionExampleModal from "../components/modals/InteractionExampleModal.jsx";

const examples = [
  {
    title: "Law Firm Knowledge Assistant",
    problem:
      "Lawyers lose time searching across fragmented case notes, internal documentation, and legal policy documents.",
    solution:
      "Deploy an internal AI knowledge assistant connected to approved legal resources and internal case materials.",
    impact: [
      "Faster legal research",
      "Consistent internal answers",
      "Reduced time spent searching documents",
    ],
    interaction: {
      user: "Lawyer: What precedent cases exist for contract termination disputes?",
      assistant:
        "AI Assistant: Here are 3 relevant precedents from your internal case database, with related clauses and summary notes.",
    },
  },
  {
    title: "Real Estate Lead Qualification Assistant",
    problem:
      "Agents spend too much time manually filtering inbound inquiries that do not match budget, timeline, or property criteria.",
    solution:
      "Use an AI assistant for websites to capture buyer intent, ask qualification questions, and route high-fit leads automatically.",
    impact: [
      "Higher lead quality",
      "Faster scheduling for serious buyers",
      "Lower manual triage workload",
    ],
    interaction: {
      user: "Agent: Which leads are ready for a property visit this week?",
      assistant:
        "AI Assistant: 8 leads match your readiness criteria and include budget, location, and urgency details.",
    },
  },
  {
    title: "Customer Support Automation Agent",
    problem:
      "Support teams receive repeated questions and struggle to maintain response quality during high-volume periods.",
    solution:
      "Deploy a support AI agent with escalation paths, knowledge retrieval, and structured handoff to human agents.",
    impact: [
      "Reduced first-response time",
      "Better ticket prioritization",
      "More time for complex support cases",
    ],
    interaction: {
      user: "Customer: Can I change my billing date and keep my current plan?",
      assistant:
        "AI Assistant: Yes, here are the supported options. If needed, I can escalate this to billing support with full context.",
    },
  },
  {
    title: "Internal Knowledge Assistant",
    problem:
      "Teams lose time searching SOPs and internal documentation when they need accurate process guidance.",
    solution:
      "Implement an internal AI knowledge assistant connected to approved documentation and role-based access controls.",
    impact: [
      "Faster onboarding",
      "More reliable process execution",
      "Lower internal support overhead",
    ],
    interaction: {
      user: "Team member: What is the standard onboarding checklist for new B2B clients?",
      assistant:
        "AI Assistant: Here is the approved onboarding checklist with owners, timelines, and required deliverables.",
    },
  },
];

export default function Agents() {
  const [activeExample, setActiveExample] = useState(null);

  return (
    <main>
      <Seo
        title="AI Agents for Business Automation | Aethos AI"
        description="Learn how Aethos AI deploys Din_0 widget-powered AI agents for lead qualification, customer support, internal knowledge, and scheduling automation."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>AI Agents for Business Automation</h1>
          <p className="hero-copy muted">
            Aethos AI designs and deploys conversational AI agents that improve lead flow,
            support quality, and team productivity.
          </p>
          <div className="page-intro-block">
            <p>
              We design assistant workflows with clear qualification logic, escalation rules, and
              integration points. The objective is measurable business value, not generic chat.
            </p>
            <ul className="content-list">
              <li>AI lead generation automation for customer-facing channels.</li>
              <li>AI assistants for websites connected to CRM and booking flows.</li>
              <li>AI workflow automation aligned with real operating constraints.</li>
            </ul>
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container">
          <SectionHeader
            title="How conversational AI works"
            description="Conversational AI combines language understanding, workflow logic, and business context to deliver useful responses and actions in real time."
          />
          <ul className="content-list">
            <li>Intent detection maps visitor messages to approved workflow paths.</li>
            <li>Knowledge retrieval pulls relevant information from trusted sources.</li>
            <li>Automation layers pass structured data to CRM, scheduling, and support tools.</li>
          </ul>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section">
        <div className="container">
          <SectionHeader
            title="Example business use cases"
            description="Practical examples used in AI consulting for SMEs and service businesses."
          />
          <div className="cards-grid">
            {examples.map((item) => (
              <article key={item.title} className="surface-card interactive-card">
                <ArchitectureTooltip copy="Problem mapping -> AI architecture -> business impact." />
                <h2>{item.title}</h2>
                <p><strong>Problem:</strong> {item.problem}</p>
                <p><strong>AI Solution:</strong> {item.solution}</p>
                <p><strong>Business Impact:</strong></p>
                <ul className="content-list compact">
                  {item.impact.map((impact) => (
                    <li key={impact}>{impact}</li>
                  ))}
                </ul>
                <button type="button" className="btn btn-secondary" onClick={() => setActiveExample(item)}>
                  See Example Interaction
                </button>
              </article>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      <InteractionExampleModal
        open={Boolean(activeExample)}
        title={activeExample ? `${activeExample.title} - Example Interaction` : "Example Interaction"}
        onClose={() => setActiveExample(null)}
      >
        {activeExample ? (
          <div className="modal-transcript">
            <p>{activeExample.interaction.user}</p>
            <p>{activeExample.interaction.assistant}</p>
          </div>
        ) : null}
      </InteractionExampleModal>
    </main>
  );
}
