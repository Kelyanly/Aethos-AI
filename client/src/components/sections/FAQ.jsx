import ScrollRevealSection from "../ScrollRevealSection.jsx";
import SectionHeader from "../SectionHeader.jsx";

const faqs = [
  {
    question: "How long does AI implementation take?",
    answer:
      "Most scoped pilots run in 3 to 6 weeks, depending on integrations, data readiness, and approval workflow.",
  },
  {
    question: "Do we need technical expertise in-house?",
    answer:
      "No. Aethos AI handles solution design, implementation planning, and rollout guidance with your operational team.",
  },
  {
    question: "What tools do AI assistants integrate with?",
    answer:
      "Typical integrations include CRM systems, internal documentation platforms, support tools, and automation APIs.",
  },
  {
    question: "What types of companies benefit most from AI agents?",
    answer:
      "Service businesses with recurring lead intake, repetitive support requests, or knowledge-heavy delivery workflows usually see the fastest return.",
  },
];

export default function FAQ() {
  return (
    <ScrollRevealSection className="section" id="faq">
      <div className="container">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Short answers to common implementation questions from teams evaluating AI consulting for SMEs."
        />
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>{faq.question}</summary>
              <p className="muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
