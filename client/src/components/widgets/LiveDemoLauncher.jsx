import { useState } from "react";
import { Link } from "react-router-dom";
import WidgetCard from "./WidgetCard.jsx";

const demos = {
  "Lead Qualifier": "Scores inbound demand and decides whether to route a human follow-up.",
  "Knowledge Assistant": "Retrieves approved answers from internal documentation.",
  "ROI Estimator": "Converts repetitive work into hours saved and projected value.",
};

export default function LiveDemoLauncher() {
  const [active, setActive] = useState("Lead Qualifier");
  return (
    <WidgetCard title="Live Demo Launcher" subtitle="Discovery" badge="Sandbox" icon="▶">
      <div className="widget-chip-wrap">
        {Object.keys(demos).map((demo) => (
          <button key={demo} type="button" className={`chip-button ${active === demo ? 'active' : ''}`} onClick={() => setActive(demo)}>{demo}</button>
        ))}
      </div>
      <p className="widget-inline-note">{demos[active]}</p>
      <Link className="btn btn-primary" to="/lab">Open AI Playground</Link>
    </WidgetCard>
  );
}
