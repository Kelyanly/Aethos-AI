import { Link } from "react-router-dom";
import { useState } from "react";

export default function OpportunityResults({ result, loading, error }) {
  const [copied, setCopied] = useState(false);

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
      <div className="op-result-actions">
        <Link className="btn btn-primary" to={roiHref}>Try ROI Calculator</Link>
        <Link className="btn btn-secondary" to="/book">Book a Consultation</Link>
        <Link className="btn btn-secondary" to="/use-cases">Explore AI Use Cases</Link>
        <button type="button" className="btn btn-secondary" onClick={onCopy}>{copied ? "Copied" : "Copy Result"}</button>
      </div>
      <p className="muted small">Generated locally in your browser.</p>
    </div>
  );
}
