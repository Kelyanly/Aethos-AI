import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";

const industries = [
  { slug: "real-estate", title: "Real Estate", copy: "Lead qualification, scheduling, and buyer intent automation." },
  { slug: "accounting", title: "Accounting", copy: "AI intake, knowledge access, and repetitive workflow automation." },
  { slug: "agencies", title: "Agencies", copy: "Lead capture, proposal workflows, and reporting assistants." },
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
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container cards-grid compact-grid">
          {industries.map((industry) => (
            <article key={industry.slug} className="surface-card compact interactive-card">
              <h2>{industry.title}</h2>
              <p className="muted">{industry.copy}</p>
              <Link to={`/industries/${industry.slug}`} className="btn btn-secondary">View Use Cases</Link>
            </article>
          ))}
        </div>
      </ScrollRevealSection>
    </main>
  );
}
