import { useMemo, useState } from "react";
import WidgetCard from "./WidgetCard.jsx";

const steps = [
  { label: "Use case", options: ["Lead qualification", "Support triage", "Knowledge search"] },
  { label: "Data source", options: ["Website chat", "Internal docs", "CRM records"] },
  { label: "Integration", options: ["HubSpot", "Slack", "Calendly"] },
];

export default function AgentBuilderPreview() {
  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState([steps[0].options[0], steps[1].options[0], steps[2].options[0]]);
  const summary = useMemo(() => `${choices[0]} + ${choices[1]} + ${choices[2]}`, [choices]);

  return (
    <WidgetCard title="Agent Builder Preview" subtitle="Architecture" badge={`Step ${index + 1}/3`} icon="◌">
      <p className="muted">Build a compact pilot stack and see how one assistant would be framed.</p>
      <div className="widget-chip-wrap">
        {steps[index].options.map((option) => (
          <button
            key={option}
            type="button"
            className={`chip-button ${choices[index] === option ? 'active' : ''}`}
            onClick={() => setChoices((current) => current.map((item, itemIndex) => (itemIndex === index ? option : item)))}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="widget-inline-note"><strong>{steps[index].label}:</strong> {choices[index]}</div>
      <div className="widget-actions-row">
        <button type="button" className="btn btn-secondary" onClick={() => setIndex((current) => Math.max(0, current - 1))}>Back</button>
        <button type="button" className="btn btn-primary" onClick={() => setIndex((current) => Math.min(steps.length - 1, current + 1))}>Next</button>
      </div>
      <p className="small muted">Preview: {summary}</p>
    </WidgetCard>
  );
}
