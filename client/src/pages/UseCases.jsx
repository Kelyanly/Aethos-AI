import Seo from "../components/Seo.jsx";

const cases = [
  {
    title: "Law firm knowledge assistant",
    problem: "Lawyers lose time searching across fragmented case notes and policy documents.",
    solution: "Deploy an internal AI knowledge assistant connected to approved legal resources.",
    impact: "Faster legal research turnaround and more consistent internal answers.",
  },
  {
    title: "Real estate lead qualification assistant",
    problem: "Agents spend too much time manually filtering inbound inquiries.",
    solution: "Use an AI assistant for websites to qualify intent and capture lead context automatically.",
    impact: "More qualified leads and higher productivity for sales teams.",
  },
  {
    title: "Customer support automation",
    problem: "Support teams are overloaded with repetitive questions.",
    solution: "Deploy a customer support AI agent with escalation rules and knowledge retrieval.",
    impact: "Reduced response times and lower repetitive workload.",
  },
  {
    title: "Internal AI knowledge search",
    problem: "Teams struggle to find accurate process and service information quickly.",
    solution: "Implement an internal AI search assistant connected to company docs and SOPs.",
    impact: "Improved operational consistency and faster decision support.",
  },
];

export default function UseCases() {
  return (
    <main>
      <Seo
        title="AI Use Cases for SMEs and Services | Aethos AI"
        description="Practical AI use cases: law firm knowledge assistants, real estate lead automation, support automation, and internal AI search."
      />

      <section className="section booking-intro">
        <div className="container">
          <h1>AI Use Cases for Business Automation</h1>
          <p className="hero-copy muted">
            Real consulting examples that show how AI automation for businesses creates measurable outcomes.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container cards-grid">
          {cases.map((item) => (
            <article key={item.title} className="surface-card">
              <h2>{item.title}</h2>
              <p><strong>Problem:</strong> {item.problem}</p>
              <p><strong>AI solution:</strong> {item.solution}</p>
              <p><strong>Expected business impact:</strong> {item.impact}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
