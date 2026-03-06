import { useState } from "react";
import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";
import InteractionExampleModal from "../components/modals/InteractionExampleModal.jsx";

const tools = [
  {
    name: "OpenAI",
    description: "Core reasoning and language generation layer used in assistant workflows.",
    useCases: ["Conversational agents", "Summarization pipelines", "Reasoning workflows"],
  },
  {
    name: "LangChain",
    description: "Orchestration layer for prompts, tools, retrieval, and workflow control.",
    useCases: ["Multi-agent workflows", "Tool orchestration", "Retrieval pipelines"],
  },
  {
    name: "Vector Database",
    description: "Semantic retrieval layer for policies, SOPs, and internal knowledge assets.",
    useCases: ["Semantic document search", "Knowledge assistants", "Internal support bots"],
  },
  {
    name: "Din_0 Widget",
    description: "Conversation interface and deployment layer for web and support assistants.",
    useCases: ["Website lead capture", "Support assistant entry point", "Conversation analytics"],
  },
  {
    name: "Workflow Automation",
    description: "Automation layer that executes actions after AI qualification and routing steps.",
    useCases: ["CRM updates", "Notification flows", "Scheduling and follow-up"],
  },
  {
    name: "AWS",
    description: "Infrastructure layer for secure deployment, scaling, and environment control.",
    useCases: ["Production hosting", "Access and security controls", "Scalable integration runtime"],
  },
];

export default function AiStack() {
  const [showArchitecture, setShowArchitecture] = useState(false);

  return (
    <main>
      <Seo
        title="AI Stack | Aethos AI"
        description="Overview of the AI technology stack used by Aethos AI for assistants, automation, and deployment."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>AI Tool Directory</h1>
          <p className="hero-copy muted">Core technologies used to design, deploy, and scale practical AI systems.</p>
          <div className="page-intro-block">
            <p>
              The stack is selected for reliability, deployment speed, and maintainability. It
              supports AI consulting for SMEs that need measurable results, not experimental demos.
            </p>
            <ul className="content-list">
              <li>Conversational AI interfaces for lead capture and support workflows.</li>
              <li>Orchestration and retrieval layers for controlled AI responses.</li>
              <li>Infrastructure options for secure production deployment.</li>
            </ul>
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container cards-grid">
          {tools.map((tool) => (
            <article key={tool.name} className="surface-card interactive-card">
              <h2>{tool.name}</h2>
              <p className="muted">{tool.description}</p>
              <p><strong>Use cases:</strong></p>
              <ul className="content-list compact">
                {tool.useCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button type="button" className="btn btn-secondary" onClick={() => setShowArchitecture(true)}>
                See Architecture Example
              </button>
            </article>
          ))}
        </div>
      </ScrollRevealSection>

      <InteractionExampleModal
        open={showArchitecture}
        onClose={() => setShowArchitecture(false)}
        title="Architecture Example"
      >
        <p><strong>{"Website -> Din_0 Widget -> LLM -> Vector DB -> Workflow automation -> CRM"}</strong></p>
        <p className="muted">
          This flow shows how front-end conversations connect to retrieval and automation layers to
          create measurable business actions.
        </p>
      </InteractionExampleModal>
    </main>
  );
}
