import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";

const content = {
  "real-estate": {
    name: "Real Estate",
    summary:
      "AI assistants help agencies filter buyer intent, prioritize high-fit inquiries, and reduce manual qualification effort.",
    challenges: [
      "High inbound inquiry volume with mixed intent quality",
      "Manual scheduling and follow-up across agents",
      "Limited visibility on lead readiness before calls",
    ],
    solutions: [
      "Lead intent qualification assistant before agent calls",
      "Appointment routing based on buyer readiness score",
      "Property Q&A assistant connected to listing data",
    ],
    workflow:
      "Visitor inquiry -> AI qualification -> readiness score -> CRM update -> viewing schedule.",
  },
  accounting: {
    name: "Accounting",
    summary:
      "Accounting firms use AI to automate intake, answer policy questions, and reduce repetitive advisory support tasks.",
    challenges: [
      "Repeated tax and compliance questions from similar client profiles",
      "Manual intake triage for advisory opportunities",
      "Slow document request follow-up",
    ],
    solutions: [
      "Website intake assistant for advisory and tax qualification",
      "Internal policy and compliance knowledge assistant",
      "Recurring document request and follow-up automation",
    ],
    workflow:
      "Client request -> AI intake and categorization -> advisor assignment -> document follow-up workflow.",
  },
  agencies: {
    name: "Agencies",
    summary:
      "Agencies apply AI lead generation automation to improve qualification, speed up pre-sales, and reduce repetitive reporting work.",
    challenges: [
      "Large volume of mixed-fit leads",
      "Delayed proposal response due to manual briefing",
      "Manual recurring reporting tasks",
    ],
    solutions: [
      "Lead qualification assistant with service-fit triage",
      "AI proposal draft assistant for faster response",
      "Campaign reporting automation assistant",
    ],
    workflow:
      "Inbound lead -> service-fit triage -> proposal prep support -> CRM and reporting automation.",
  },
};

export default function IndustryDetail() {
  const { industryId } = useParams();
  const detail = content[industryId] || content.agencies;

  return (
    <main>
      <Seo
        title={`${detail.name} AI Use Cases | Aethos AI`}
        description={`Practical AI assistants and workflow automation examples for ${detail.name}.`}
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>{detail.name} AI Use Cases</h1>
          <p className="hero-copy muted">{detail.summary}</p>
          <div className="page-intro-block">
            <ul className="content-list">
              {detail.challenges.map((challenge) => (
                <li key={challenge}>{challenge}</li>
              ))}
            </ul>
          </div>
          <Link className="btn btn-secondary" to="/industries">Back to industries</Link>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container cards-grid compact-grid">
          {detail.solutions.map((item) => (
            <article key={item} className="surface-card compact interactive-card">
              <h2>{item}</h2>
            </article>
          ))}
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section">
        <div className="container">
          <article className="surface-card interactive-card">
            <h2>Example workflow</h2>
            <p className="muted">{detail.workflow}</p>
          </article>
        </div>
      </ScrollRevealSection>
    </main>
  );
}
