import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";
import { generateAiRoadmap } from "../agents/roadmapGenerator.js";

const initial = {
  industry: "agency",
  teamSize: "12",
  monthlyLeads: "110",
  monthlySupportTickets: "180",
};

export default function AiRoadmap() {
  const [form, setForm] = useState(initial);
  const [result, setResult] = useState(null);

  function onChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function onSubmit(event) {
    event.preventDefault();
    setResult(
      generateAiRoadmap({
        industry: form.industry,
        teamSize: Number(form.teamSize),
        monthlyLeads: Number(form.monthlyLeads),
        monthlySupportTickets: Number(form.monthlySupportTickets),
      }),
    );
  }

  return (
    <main>
      <Seo
        title="Generate Your AI Roadmap | Aethos AI"
        description="Generate an AI roadmap based on your industry, team size, leads, and support workload."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>Generate Your AI Roadmap</h1>
          <p className="hero-copy muted">
            Enter your business profile to generate a practical 3-step AI roadmap and estimate value.
          </p>
          <div className="page-intro-block">
            <p>
              This roadmap tool converts high-level goals into an ordered execution path. It is
              useful for teams planning AI automation for businesses with limited delivery capacity.
            </p>
            <ul className="content-list">
              <li>Prioritize one pilot with clear operational value.</li>
              <li>Sequence deployment to reduce implementation risk.</li>
              <li>Estimate ROI before expanding to additional workflows.</li>
            </ul>
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container booking-grid">
          <form className="lead-form" onSubmit={onSubmit}>
            <label>
              Industry
              <select name="industry" value={form.industry} onChange={onChange}>
                <option value="agency">Agency</option>
                <option value="real_estate">Real Estate</option>
                <option value="accounting">Accounting</option>
                <option value="saas">SaaS Startup</option>
                <option value="service">Service Business</option>
              </select>
            </label>

            <label>
              Team size
              <input type="number" min="1" name="teamSize" value={form.teamSize} onChange={onChange} required />
            </label>

            <label>
              Monthly leads
              <input
                type="number"
                min="0"
                name="monthlyLeads"
                value={form.monthlyLeads}
                onChange={onChange}
                required
              />
            </label>

            <label>
              Monthly support tickets
              <input
                type="number"
                min="0"
                name="monthlySupportTickets"
                value={form.monthlySupportTickets}
                onChange={onChange}
                required
              />
            </label>

            <div className="full-row form-actions">
              <button className="btn btn-primary" type="submit">Generate Roadmap</button>
            </div>
          </form>

          <aside className="booking-side-panel">
            <div className="surface-card">
              <h2>Your AI Roadmap</h2>
              <p className="muted">
                The generated plan is a starting point. A consultation helps adapt scope, systems,
                and ownership to your current team setup.
              </p>
              {!result ? (
                <p className="muted">Submit your profile to generate your roadmap.</p>
              ) : (
                <div className="lab-result">
                  {result.roadmap.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                  <p>
                    <strong>Estimated annual ROI value:</strong> EUR {result.estimatedAnnualSavings.toLocaleString()}
                  </p>
                </div>
              )}
              <Link to="/book" className="btn btn-primary">Discuss Your Roadmap</Link>
            </div>
          </aside>
        </div>
      </ScrollRevealSection>
    </main>
  );
}
