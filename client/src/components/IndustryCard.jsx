import { Link } from "react-router-dom";
import { useState } from "react";
import InteractionExampleModal from "./modals/InteractionExampleModal.jsx";

export default function IndustryCard({ industry }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="surface-card compact interactive-card">
      <h2>{industry.title}</h2>
      <p className="muted">{industry.copy}</p>
      <p className="muted small">{industry.roiEstimate}</p>
      <button type="button" className="btn btn-secondary" onClick={() => setOpen(true)}>
        View Use Cases
      </button>

      <InteractionExampleModal open={open} onClose={() => setOpen(false)} title={`${industry.title} AI Automation`}>
        <p className="muted">Common operational challenges</p>
        <ul className="content-list compact">
          {industry.challenges.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="muted">AI solutions</p>
        <ul className="content-list compact">
          {industry.solutions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p><strong>Example workflow:</strong> {industry.workflow}</p>
        <p><strong>ROI estimate:</strong> {industry.roiEstimate}</p>
        <div className="modal-actions">
          <Link to={`/industries/${industry.slug}`} className="btn btn-primary" onClick={() => setOpen(false)}>
            Open Full Industry Page
          </Link>
        </div>
      </InteractionExampleModal>
    </article>
  );
}
