import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";

const tools = [
  { name: "OpenAI", description: "LLM reasoning and generation for assistant workflows.", useCase: "Lead qualification and knowledge synthesis." },
  { name: "LangChain", description: "Orchestration layer for prompts, tools, and retrieval pipelines.", useCase: "Agent workflow composition and chaining." },
  { name: "Vector Database", description: "Semantic retrieval over internal documents and SOPs.", useCase: "Internal AI knowledge assistants." },
  { name: "ChatHive", description: "Conversation interface and deployment layer for web agents.", useCase: "Website lead capture and support assistant." },
  { name: "Workflow Automation", description: "No-code/API automation for post-assistant actions.", useCase: "CRM updates, notifications, and follow-up flows." },
  { name: "AWS", description: "Cloud infrastructure and secure deployment options.", useCase: "Scalable production hosting and integrations." },
];

export default function AiStack() {
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
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container cards-grid">
          {tools.map((tool) => (
            <article key={tool.name} className="surface-card interactive-card">
              <h2>{tool.name}</h2>
              <p className="muted">{tool.description}</p>
              <p><strong>Typical use case:</strong> {tool.useCase}</p>
            </article>
          ))}
        </div>
      </ScrollRevealSection>
    </main>
  );
}
