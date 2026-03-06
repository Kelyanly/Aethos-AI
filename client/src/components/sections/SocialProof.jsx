import ScrollRevealSection from "../ScrollRevealSection.jsx";

const proofItems = [
  "50% reduction in lead qualification work",
  "70 hours saved per month",
  "EUR 60k estimated annual operational value",
];

export default function SocialProof() {
  return (
    <ScrollRevealSection className="section section-alt" id="social-proof">
      <div className="container">
        <article className="surface-card social-proof-card interactive-card">
          <p className="eyebrow">Example Impact for Agencies</p>
          <h2>Representative outcomes from practical AI deployments</h2>
          <p className="muted">
            These benchmark results illustrate what teams can achieve when AI assistants and
            workflow automation are deployed with a clear scope and execution plan.
          </p>
          <ul className="content-list">
            {proofItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </ScrollRevealSection>
  );
}
