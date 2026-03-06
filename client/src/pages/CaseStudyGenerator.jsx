import { useState } from "react";
import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";

function buildCase({ industry, teamSize, monthlyLeads }) {
  const industryLabel = industry.replace("_", " ");
  const qualificationReduction = Math.min(65, Math.round(28 + teamSize * 0.8));
  const fasterResponse = Math.round(18 + monthlyLeads * 0.09);
  const pipelineQuality = Math.min(58, Math.round(22 + monthlyLeads * 0.07));

  return {
    title: `AI Implementation for ${industryLabel.charAt(0).toUpperCase() + industryLabel.slice(1)}`,
    teamSize,
    monthlyLeads,
    challenge: "Manual lead filtering and delayed responses created pipeline friction.",
    solution: "AI lead qualification assistant integrated with CRM and scheduling workflow.",
    results: [
      `${qualificationReduction}% reduction in lead qualification time`,
      `${fasterResponse}% faster response to prospects`,
      `${pipelineQuality}% improvement in pipeline quality indicators`,
    ],
  };
}

export default function CaseStudyGenerator() {
  const [industry, setIndustry] = useState("agency");
  const [teamSize, setTeamSize] = useState("20");
  const [monthlyLeads, setMonthlyLeads] = useState("200");
  const [result, setResult] = useState(null);

  function onSubmit(event) {
    event.preventDefault();
    setResult(buildCase({ industry, teamSize: Number(teamSize), monthlyLeads: Number(monthlyLeads) }));
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
          <div className="page-intro-block">
            <p>
              This generator creates realistic storytelling blocks for demos and sales conversations.
              Use it to explain value in clear business language.
            </p>
          </div>
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
            <label>
              Monthly leads
              <input type="number" min="0" value={monthlyLeads} onChange={(event) => setMonthlyLeads(event.target.value)} />
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
                  <p><strong>Team size:</strong> {result.teamSize}</p>
                  <p><strong>Monthly leads:</strong> {result.monthlyLeads}</p>
                  <p><strong>Challenges:</strong> {result.challenge}</p>
                  <p><strong>Solution:</strong> {result.solution}</p>
                  <p><strong>Results:</strong></p>
                  <ul className="content-list compact">
                    {result.results.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </ScrollRevealSection>
    </main>
  );
}
