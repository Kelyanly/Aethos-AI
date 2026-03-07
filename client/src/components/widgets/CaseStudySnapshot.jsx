import { useState } from "react";
import WidgetCard from "./WidgetCard.jsx";

const states = {
  before: "Leads arrive without scoring, teams triage manually, and follow-up is delayed.",
  after: "Qualified leads are scored automatically, routed instantly, and synced to the CRM.",
};

export default function CaseStudySnapshot() {
  const [mode, setMode] = useState("before");
  return (
    <WidgetCard title="Case Study Snapshot" subtitle="Trust" badge={mode === 'before' ? 'Before' : 'After'} icon="⇄">
      <div className="widget-chip-wrap">
        {Object.keys(states).map((item) => (
          <button key={item} type="button" className={`chip-button ${mode === item ? 'active' : ''}`} onClick={() => setMode(item)}>{item}</button>
        ))}
      </div>
      <p className="widget-inline-note">{states[mode]}</p>
    </WidgetCard>
  );
}
