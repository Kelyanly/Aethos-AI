import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";

const cases = [
  {
    name: "Real estate agency",
    leads: 300,
    potential: 48,
    savingsHours: 70,
    annualValue: "EUR 52,000",
  },
  {
    name: "Accounting practice",
    leads: 120,
    potential: 44,
    savingsHours: 54,
    annualValue: "EUR 46,000",
  },
  {
    name: "B2B marketing agency",
    leads: 190,
    potential: 51,
    savingsHours: 76,
    annualValue: "EUR 64,000",
  },
];

export default function RoiCases() {
  return (
    <main>
      <Seo
        title="Example AI ROI Cases | Aethos AI"
        description="Illustrative ROI outcomes from lead qualification assistants and workflow automation deployments."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>Example ROI Cases</h1>
          <p className="hero-copy muted">Illustrative benchmarks used to scope practical AI opportunities.</p>
          <div className="page-intro-block">
            <p>
              These scenarios are reference estimates built from common service-business workflows.
              Actual outcomes depend on process quality, adoption, and integration scope.
            </p>
            <ul className="content-list">
              <li>Use benchmarks to estimate feasibility and implementation priority.</li>
              <li>Validate assumptions with your own baseline metrics.</li>
              <li>Convert benchmark scenarios into a pilot plan with measurable KPIs.</li>
            </ul>
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container cards-grid">
          {cases.map((item) => (
            <article key={item.name} className="surface-card interactive-card">
              <h2>{item.name}</h2>
              <p><strong>Leads per month:</strong> {item.leads}</p>
              <p><strong>Automation potential:</strong> {item.potential}%</p>
              <p><strong>Estimated time savings:</strong> {item.savingsHours}h/month</p>
              <p><strong>Estimated annual value:</strong> {item.annualValue}</p>
            </article>
          ))}
        </div>
      </ScrollRevealSection>
    </main>
  );
}
