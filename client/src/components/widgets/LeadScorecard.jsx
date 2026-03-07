import { useMemo, useState } from "react";
import WidgetCard from "./WidgetCard.jsx";

const fields = ["Budget", "Intent", "Timeline", "Fit", "Urgency"];

export default function LeadScorecard() {
  const [values, setValues] = useState({ Budget: 60, Intent: 70, Timeline: 55, Fit: 80, Urgency: 48 });
  const score = useMemo(() => Math.round(Object.values(values).reduce((sum, value) => sum + value, 0) / fields.length), [values]);
  return (
    <WidgetCard title="Lead Qualification Scorecard" subtitle="ROI" badge={`${score}/100`} icon="▥">
      <div className="widget-list-stack">
        {fields.map((field) => (
          <label key={field} className="widget-range-row">
            <span>{field}</span>
            <input type="range" min="0" max="100" value={values[field]} onChange={(event) => setValues((current) => ({ ...current, [field]: Number(event.target.value) }))} />
          </label>
        ))}
      </div>
    </WidgetCard>
  );
}
