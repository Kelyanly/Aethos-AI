import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";

const content = {
  "real-estate": {
    name: "Real Estate",
    items: [
      "Lead intent qualification assistant before agent calls",
      "Appointment routing based on buyer readiness score",
      "Property Q&A assistant connected to listing data",
    ],
  },
  accounting: {
    name: "Accounting",
    items: [
      "Website intake assistant for advisory and tax qualification",
      "Internal policy and compliance knowledge assistant",
      "Recurring document request and follow-up automation",
    ],
  },
  agencies: {
    name: "Agencies",
    items: [
      "Lead qualification assistant with service-fit triage",
      "AI proposal draft assistant for faster response",
      "Campaign reporting automation assistant",
    ],
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
          <p className="hero-copy muted">Focused systems we typically deploy in this segment.</p>
          <Link className="btn btn-secondary" to="/industries">Back to industries</Link>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container cards-grid compact-grid">
          {detail.items.map((item) => (
            <article key={item} className="surface-card compact interactive-card">
              <h2>{item}</h2>
            </article>
          ))}
        </div>
      </ScrollRevealSection>
    </main>
  );
}
