import { Link } from "react-router-dom";
import { useState } from "react";

export default function OpportunityResults({ result, loading, error }) {
  const [copied, setCopied] = useState(false);
  const [showPlan, setShowPlan] = useState(false);

  async function onCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1100);
  }

  if (loading) {
    return (
      <div className="op-results skeleton">
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="op-results">
        <p className="form-feedback error">{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="op-results empty">
        <p className="muted">Fill the form and generate structured AI opportunities.</p>
      </div>
    );
  }

  const roiHref = `${result.recommendedPage || "/ai-roi-calculator"}?scenario=${encodeURIComponent(result.summary)}`;

  return (
    <div className="op-results">
      <h3>{result.summary}</h3>
      <div className="op-score-grid">
        <article className="surface-card compact">
          <h4>AI Opportunity Score</h4>
          <p><strong>Automation Potential:</strong> {result.opportunityScore}%</p>
          <p><strong>Estimated time saved:</strong> {result.estimatedHoursSaved} hours/month</p>
          <p><strong>Estimated annual value:</strong> EUR {result.estimatedAnnualValue.toLocaleString()}</p>
        </article>
      </div>
      <div className="cards-grid compact-grid">
        {result.items.map((item) => (
          <article key={item.title} className="surface-card compact interactive-card">
            <h4>{item.title}</h4>
            <p className="muted">{item.description}</p>
            <span className={`impact-tag ${String(item.impact).toLowerCase()}`}>{item.impact}</span>
          </article>
        ))}
      </div>
      <p><strong>First implementation step:</strong> {result.firstStep}</p>
      <button type="button" className="btn btn-secondary" onClick={() => setShowPlan((current) => !current)}>
        {showPlan ? "Hide implementation plan" : "Generate detailed implementation plan"}
      </button>
      {showPlan && result.roadmap?.length ? (
        <div className="lab-result">
          <p><strong>Suggested implementation roadmap</strong></p>
          <ul className="content-list compact">
            {result.roadmap.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="op-result-actions">
        <Link className="btn btn-primary" to={roiHref}>Try ROI Calculator</Link>
        <Link className="btn btn-secondary" to="/book">Get Your AI Opportunity Assessment</Link>
        <Link className="btn btn-secondary" to="/use-cases">Explore AI Use Cases</Link>
        <button type="button" className="btn btn-secondary" onClick={onCopy}>{copied ? "Copied" : "Copy Result"}</button>
      </div>
      <p className="muted small">Generated locally in your browser.</p>
    </div>
  );
}
