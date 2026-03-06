import ScrollRevealSection from "../ScrollRevealSection.jsx";
import SectionHeader from "../SectionHeader.jsx";

const steps = [
  {
    title: "Discovery",
    copy: "Map workflows, define targets, and identify the best first automation opportunity.",
  },
  {
    title: "Prototype",
    copy: "Build a scoped AI assistant with clear boundaries and measurable success criteria.",
  },
  {
    title: "Pilot",
    copy: "Deploy with real users and track quality, response speed, and workload reduction.",
  },
  {
    title: "Deployment",
    copy: "Integrate with production systems and establish governance, support, and optimization loops.",
  },
];

export default function HowWeWork() {
  return (
    <ScrollRevealSection className="section section-alt" id="how-we-work">
      <div className="container">
        <SectionHeader
          eyebrow="Execution Model"
          title="How we work"
          description="Aethos AI uses a phased delivery model to move from strategy to production with controlled risk and clear milestones."
        />
        <div className="roadmap-grid">
          {steps.map((step, index) => (
            <article key={step.title} className="surface-card interactive-card">
              <p className="eyebrow">Step {index + 1}</p>
              <h3>{step.title}</h3>
              <p className="muted">{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
