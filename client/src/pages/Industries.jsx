import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";
import IndustryCard from "../components/IndustryCard.jsx";

const industries = [
  {
    slug: "real-estate",
    title: "Real Estate",
    copy: "Lead qualification, scheduling, and buyer intent automation.",
    challenges: [
      "Filtering inbound property inquiries",
      "Qualifying buyers versus casual browsers",
      "Scheduling visits across multiple agents",
    ],
    solutions: [
      "AI lead qualification assistant",
      "Automated scheduling workflow",
      "Buyer intent scoring logic",
    ],
    workflow:
      "Visitor -> AI chat assistant -> qualification questions -> lead score -> CRM entry -> meeting scheduling",
    roiEstimate:
      "Real estate agencies with 300+ monthly leads often automate 40-50% of qualification work.",
  },
  {
    slug: "accounting",
    title: "Accounting",
    copy: "AI intake, knowledge access, and repetitive workflow automation.",
    challenges: [
      "Repeated client tax and compliance questions",
      "Manual advisory intake triage",
      "Slow follow-up on documentation requests",
    ],
    solutions: [
      "Client intake AI assistant",
      "Internal policy knowledge assistant",
      "Document follow-up automation",
    ],
    workflow:
      "Website inquiry -> AI intake questions -> service-fit score -> advisor assignment -> follow-up automation",
    roiEstimate:
      "Accounting teams commonly automate 35-45% of repetitive qualification and intake work.",
  },
  {
    slug: "agencies",
    title: "Agencies",
    copy: "Lead capture, proposal workflows, and reporting assistants.",
    challenges: [
      "High volume of mixed-fit service inquiries",
      "Slow proposal preparation",
      "Manual campaign reporting handoffs",
    ],
    solutions: [
      "Lead qualification assistant",
      "Proposal drafting assistant",
      "Automated reporting summaries",
    ],
    workflow:
      "Inbound lead -> qualification assistant -> opportunity score -> CRM handoff -> proposal workflow",
    roiEstimate:
      "Growth agencies typically automate 45-55% of pre-sales and repetitive delivery tasks.",
  },
];

export default function Industries() {
  return (
    <main>
      <Seo
        title="AI by Industry | Aethos AI"
        description="Industry-focused AI consulting use cases for real estate, accounting firms, and agencies."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>Industries</h1>
          <p className="hero-copy muted">Industry-specific AI systems with practical outcomes.</p>
          <div className="page-intro-block">
            <p>
              Each industry has different qualification patterns, response expectations, and
              compliance needs. We adapt AI automation for businesses based on operating reality.
            </p>
            <ul className="content-list">
              <li>Lead generation and qualification assistants for customer-facing teams.</li>
              <li>Knowledge assistants for internal documentation and process accuracy.</li>
              <li>Workflow automation linked to scheduling, CRM, and reporting tools.</li>
            </ul>
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container cards-grid compact-grid">
          {industries.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </div>
      </ScrollRevealSection>
    </main>
  );
}
