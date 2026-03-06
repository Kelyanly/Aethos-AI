import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";
import { generateUseCasesApi } from "../lib/api.js";

export default function AiUseCaseGenerator() {
  const [form, setForm] = useState({ industry: "agency", companySize: "12", repetitiveTask: "" });
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
      const data = await generateUseCasesApi({
        industry: form.industry,
        companySize: Number(form.companySize),
        repetitiveTask: form.repetitiveTask,
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
        title="AI Use Case Generator | Aethos AI"
        description="Describe your company and generate practical AI opportunities for lead capture, knowledge assistants, and workflow automation."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>AI Use Case Generator</h1>
          <p className="hero-copy muted">
            Share your context and generate a short list of practical AI opportunities you can deploy first.
          </p>
          <div className="page-intro-block">
            <p>
              This tool is designed for teams that want quick direction on AI automation for
              businesses without committing to a long discovery phase.
            </p>
            <ul className="content-list">
              <li>Describe one repetitive task and a customer-facing challenge.</li>
              <li>Receive structured recommendations focused on operational impact.</li>
              <li>Use the output to prepare a clearer consultation discussion.</li>
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
              Company Size
              <input
                type="number"
                min="1"
                name="companySize"
                value={form.companySize}
                onChange={onChange}
                required
              />
            </label>

            <label className="full-row">
              Main repetitive task
              <textarea
                name="repetitiveTask"
                rows="4"
                value={form.repetitiveTask}
                onChange={onChange}
                placeholder="Example: manual follow-up with unqualified leads"
                required
              />
            </label>

            <div className="full-row form-actions">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Generating..." : "Generate AI Opportunities"}
              </button>
            </div>

            {error ? <p className="form-feedback error">{error}</p> : null}
          </form>

          <aside className="booking-side-panel">
            <div className="surface-card">
              <h2>Generated Opportunities</h2>
              <ul className="content-list compact">
                <li>Prioritize one high-friction workflow first.</li>
                <li>Use qualification criteria before full automation rollout.</li>
                <li>Validate value with a short pilot and tracked KPI.</li>
              </ul>
              {!result ? (
                <p className="muted">Submit your inputs to generate use cases.</p>
              ) : (
                <div className="lab-result">
                  {result.useCases.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                  <p>
                    <strong>Estimated impact:</strong> {result.estimatedImpact}
                  </p>
                </div>
              )}
              <Link to="/book" className="btn btn-primary">Discuss this AI Roadmap</Link>
            </div>
          </aside>
        </div>
      </ScrollRevealSection>
    </main>
  );
}
