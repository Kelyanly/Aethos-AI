import { useState } from "react";
import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";

function buildCase({ industry, teamSize }) {
  const monthlyHours = Math.round(teamSize * 3.5 + (industry === "real_estate" ? 18 : 12));
  const annualValue = Math.round(monthlyHours * 45 * 12);
  return {
    title: `${industry.replace("_", " ")} team (${teamSize} employees)`,
    problem: "Manual qualification and repetitive follow-up create response delays.",
    solution: "AI lead qualification assistant + workflow automation for CRM and scheduling.",
    outcome: `Estimated time saved: ${monthlyHours} hours/month (~EUR ${annualValue.toLocaleString()}/year).`,
  };
}

export default function CaseStudyGenerator() {
  const [industry, setIndustry] = useState("agency");
  const [teamSize, setTeamSize] = useState("20");
  const [result, setResult] = useState(null);

  function onSubmit(event) {
    event.preventDefault();
    setResult(buildCase({ industry, teamSize: Number(teamSize) }));
  }

  return (
    <main>
      <Seo
        title="Case Study Generator | Aethos AI"
        description="Generate sample AI case studies by industry and team size to visualize implementation impact."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>Case Study Generator</h1>
          <p className="hero-copy muted">Create a sample implementation story tailored to a business profile.</p>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container booking-grid">
          <form className="lead-form" onSubmit={onSubmit}>
            <label>
              Industry
              <select value={industry} onChange={(event) => setIndustry(event.target.value)}>
                <option value="agency">Agency</option>
                <option value="real_estate">Real Estate</option>
                <option value="accounting">Accounting</option>
                <option value="service">Service Business</option>
              </select>
            </label>
            <label>
              Team Size
              <input type="number" min="1" value={teamSize} onChange={(event) => setTeamSize(event.target.value)} />
            </label>
            <div className="full-row form-actions">
              <button className="btn btn-primary">Generate Case Study</button>
            </div>
          </form>
          <aside className="booking-side-panel">
            <div className="surface-card">
              <h2>Generated Case Study</h2>
              {!result ? (
                <p className="muted">Generate a case to preview practical outcomes.</p>
              ) : (
                <div className="lab-result">
                  <p><strong>{result.title}</strong></p>
                  <p><strong>Problem:</strong> {result.problem}</p>
                  <p><strong>AI solution:</strong> {result.solution}</p>
                  <p><strong>Outcome:</strong> {result.outcome}</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </ScrollRevealSection>
    </main>
  );
}
