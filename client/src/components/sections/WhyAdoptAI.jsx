import ScrollRevealSection from "../ScrollRevealSection.jsx";
import SectionHeader from "../SectionHeader.jsx";

const cards = [
  {
    title: "Reduce Repetitive Work",
    description:
      "Teams spend hours answering the same questions and searching for information. AI assistants automate those repetitive interactions.",
  },
  {
    title: "Capture Leads 24/7",
    description:
      "AI agents engage visitors instantly, qualify intent, and send structured lead information directly to your CRM.",
  },
  {
    title: "Scale Knowledge Access",
    description:
      "Employees can ask questions and retrieve answers instantly from internal documentation and SOPs.",
  },
  {
    title: "Improve Operational Consistency",
    description:
      "AI assistants enforce processes and ensure teams follow the same procedures across projects and clients.",
  },
];

export default function WhyAdoptAI() {
  return (
    <ScrollRevealSection className="section section-alt" id="why-adopt-ai">
      <div className="container">
        <SectionHeader
          eyebrow="Market Shift"
          title="Why companies are deploying AI agents today"
          description="Businesses adopt AI assistants to improve response speed, reduce repetitive work, and protect service quality as demand grows."
        />
        <div className="cards-grid compact-grid">
          {cards.map((card) => (
            <article key={card.title} className="surface-card compact interactive-card">
              <h3>{card.title}</h3>
              <p className="muted">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
