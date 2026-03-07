import { useState } from "react";
import WidgetCard from "./WidgetCard.jsx";
import { roadmapSteps } from "./data.js";

export default function RoadmapTimeline() {
  const [active, setActive] = useState(0);
  return (
    <WidgetCard title="Roadmap Timeline" subtitle="Architecture" badge={roadmapSteps[active].week} icon="⋯">
      <div className="widget-timeline">
        {roadmapSteps.map((step, index) => (
          <button key={step.week} type="button" className={`widget-step ${active === index ? 'active' : ''}`} onClick={() => setActive(index)}>
            <strong>{step.week}</strong>
            <span>{step.title}</span>
          </button>
        ))}
      </div>
      <p className="widget-inline-note">{roadmapSteps[active].copy}</p>
    </WidgetCard>
  );
}
