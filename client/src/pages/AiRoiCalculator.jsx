import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { runRoiCalculator } from "../lib/api.js";

const demoValues = {
  employees: "25",
  monthlySupportTickets: "300",
  monthlyLeads: "90",
  timePerSupportRequest: "10",
  hourlyCost: "40",
};

export default function AiRoiCalculator() {
  const [form, setForm] = useState(demoValues);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function onChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function useDemoValues() {
    setForm(demoValues);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await runRoiCalculator({
        employees: Number(form.employees),
        monthlySupportTickets: Number(form.monthlySupportTickets),
        monthlyLeads: Number(form.monthlyLeads),
        timePerSupportRequest: Number(form.timePerSupportRequest),
        hourlyCost: Number(form.hourlyCost),
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
        title="AI Automation ROI Calculator | Aethos AI"
        description="Estimate how much time and money your business could save with AI assistants and workflow automation."
      />

      <section className="section booking-intro">
        <div className="container">
          <h1>AI Automation ROI Calculator</h1>
          <p className="hero-copy muted">
            Estimate how much time and money your business could save with AI assistants and workflow automation.
          </p>
          <div className="demo-inline-actions">
            <button type="button" className="btn btn-secondary" onClick={useDemoValues}>
              Use Demo Values
            </button>
            <p className="muted small">
              Employees: 25, Tickets: 300, Leads: 90, Time: 10 min, Hourly cost: 40 EUR.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container booking-grid">
          <form className="lead-form" onSubmit={onSubmit}>
            <label>
              Number of employees
              <input type="number" min="1" name="employees" value={form.employees} onChange={onChange} required />
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

            <label>
              Monthly leads
              <input type="number" min="0" name="monthlyLeads" value={form.monthlyLeads} onChange={onChange} required />
            </label>

            <label>
              Average time per support request (minutes)
              <input
                type="number"
                min="1"
                name="timePerSupportRequest"
                value={form.timePerSupportRequest}
                onChange={onChange}
                required
              />
            </label>

            <label>
              Average hourly cost per employee (EUR)
              <input type="number" min="1" name="hourlyCost" value={form.hourlyCost} onChange={onChange} required />
            </label>

            <div className="full-row form-actions">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Calculating..." : "Calculate ROI"}
              </button>
            </div>

            {error ? <p className="form-feedback error">{error}</p> : null}
          </form>

          <aside className="booking-side-panel">
            <div className="surface-card">
              <h2>Estimated ROI Output</h2>
              {!result ? (
                <p className="muted">Complete the form to generate your AI ROI estimate.</p>
              ) : (
                <div className="lab-result">
                  <p><strong>Estimated hours saved per month:</strong> {result.hoursSavedPerMonth}</p>
                  <p><strong>Estimated automation potential:</strong> {result.automationPotential}%</p>
                  <p><strong>Estimated monthly savings:</strong> EUR {result.estimatedMonthlySavings.toLocaleString()}</p>
                  <p><strong>Estimated annual savings:</strong> EUR {result.estimatedAnnualSavings.toLocaleString()}</p>
                  <p><strong>Estimated annual ROI:</strong> {result.estimatedAnnualRoi}%</p>
                </div>
              )}
              <Link to="/book" className="btn btn-primary">
                Discuss Your AI Opportunities
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
