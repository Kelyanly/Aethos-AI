import { useState } from "react";
import WidgetCard from "./WidgetCard.jsx";
import { architectureSteps } from "./data.js";

export default function StackExplorer() {
  const [active, setActive] = useState(0);
  return (
    <WidgetCard title="Stack Explorer" subtitle="Architecture" badge={`Layer ${active + 1}`} icon="▤">
      <div className="widget-steps">
        {architectureSteps.map((step, index) => (
          <button key={step} type="button" className={`widget-step ${active === index ? 'active' : ''}`} onClick={() => setActive(index)}>
            {step}
          </button>
        ))}
      </div>
    </WidgetCard>
  );
}
