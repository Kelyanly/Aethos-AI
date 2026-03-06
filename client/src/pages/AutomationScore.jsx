import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";
import { runAutomationScore } from "../lib/api.js";

const initial = {
  employees: "15",
  monthlyLeads: "120",
  supportTickets: "200",
  manualTasks: "6",
  softwareStack: "crm, email, docs",
};

export default function AutomationScore() {
  const [form, setForm] = useState(initial);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function onChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await runAutomationScore({
        employees: Number(form.employees),
        monthlyLeads: Number(form.monthlyLeads),
        supportTickets: Number(form.supportTickets),
        manualTasks: Number(form.manualTasks),
        softwareStack: form.softwareStack,
      });
      setResult(data);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Seo
        title="Automation Score | Aethos AI"
        description="Answer five questions to estimate your automation readiness and priority AI opportunities."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>Automation Score</h1>
          <p className="hero-copy muted">
            Quick diagnostic to estimate AI automation readiness and where to start.
          </p>
          <div className="page-intro-block">
            <p>
              This assessment gives an initial signal of how ready your team is for AI workflow
              automation. It is useful for prioritizing first pilots and implementation scope.
            </p>
            <ul className="content-list">
              <li>Capture current workload pressure and process repetition.</li>
              <li>Estimate readiness level with clear next action guidance.</li>
              <li>Use the result to prepare a focused consultation.</li>
            </ul>
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container booking-grid">
          <form className="lead-form" onSubmit={onSubmit}>
            <label>
              Number of employees
              <input type="number" min="1" name="employees" value={form.employees} onChange={onChange} required />
            </label>
            <label>
              Monthly leads
              <input type="number" min="0" name="monthlyLeads" value={form.monthlyLeads} onChange={onChange} required />
            </label>
            <label>
              Monthly support tickets
              <input type="number" min="0" name="supportTickets" value={form.supportTickets} onChange={onChange} required />
            </label>
            <label>
              Number of repetitive manual tasks
              <input type="number" min="0" name="manualTasks" value={form.manualTasks} onChange={onChange} required />
            </label>
            <label className="full-row">
              Current software stack
              <input name="softwareStack" value={form.softwareStack} onChange={onChange} required />
            </label>
            <div className="full-row form-actions">
              <button className="btn btn-primary" disabled={loading}>{loading ? "Scoring..." : "Calculate Score"}</button>
            </div>
            {error ? <p className="form-feedback error">{error}</p> : null}
          </form>

          <aside className="booking-side-panel">
            <div className="surface-card">
              <h2>Readiness Result</h2>
              {!result ? (
                <p className="muted">Complete the diagnostic to see your score.</p>
              ) : (
                <div className="lab-result">
                  <p><strong>Automation score:</strong> {result.score}/100</p>
                  <p><strong>Level:</strong> {result.level}</p>
                  <p className="muted">{result.recommendation}</p>
                </div>
              )}
              <Link to="/book" className="btn btn-primary">Get Your AI Opportunity Assessment</Link>
            </div>
          </aside>
        </div>
      </ScrollRevealSection>
    </main>
  );
}
