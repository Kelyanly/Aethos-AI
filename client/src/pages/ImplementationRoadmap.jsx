import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";

const phases = [
  { title: "Discovery", duration: "Week 1", copy: "Map workflows, identify bottlenecks, define success metrics." },
  { title: "Prototype", duration: "Week 2", copy: "Build scoped assistant and validate behavior with real scenarios." },
  { title: "Pilot", duration: "Weeks 3-4", copy: "Deploy to controlled users and measure lead and productivity impact." },
  { title: "Deployment", duration: "Week 5", copy: "Connect production systems, governance, and escalation workflows." },
  { title: "Optimization", duration: "Ongoing", copy: "Improve prompts, routing logic, and ROI based on usage data." },
];

export default function ImplementationRoadmap() {
  return (
    <main>
      <Seo
        title="AI Implementation Roadmap | Aethos AI"
        description="Discovery, prototype, pilot, deployment, and optimization roadmap for AI assistant implementation."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>AI Implementation Roadmap</h1>
          <p className="hero-copy muted">A realistic path from first scope to measurable business value.</p>
          <div className="page-intro-block">
            <p>
              This sequence keeps implementation risk low while giving teams clear checkpoints for
              value delivery and operational readiness.
            </p>
            <ul className="content-list">
              <li>Scope one high-impact workflow before expanding.</li>
              <li>Validate with pilot users and measurable KPIs.</li>
              <li>Scale only after quality and governance checks pass.</li>
            </ul>
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container roadmap-grid">
          {phases.map((phase) => (
            <article key={phase.title} className="surface-card interactive-card">
              <p className="eyebrow">{phase.duration}</p>
              <h2>{phase.title}</h2>
              <p className="muted">{phase.copy}</p>
            </article>
          ))}
        </div>
      </ScrollRevealSection>
    </main>
  );
}
