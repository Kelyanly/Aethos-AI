import { useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import WidgetCard from "./WidgetCard.jsx";
import { bottleneckData } from "./data.js";

const departments = Object.keys(bottleneckData);

export default function WorkflowBottleneckFinder() {
  const [active, setActive] = useState(departments[0]);

  return (
    <WidgetCard title="Workflow Bottleneck Finder" subtitle="Discovery" badge={active} icon="▣">
      <div className="widget-chip-wrap">
        {departments.map((department) => (
          <button key={department} type="button" className={`chip-button ${active === department ? 'active' : ''}`} onClick={() => setActive(department)}>
            {department}
          </button>
        ))}
      </div>
      <Flipper flipKey={active}>
        <div className="widget-list-stack">
          {bottleneckData[active].map((item, index) => (
            <Flipped key={`${active}-${index}`} flipId={`${active}-${index}`}>
              <p className="widget-inline-note">{item}</p>
            </Flipped>
          ))}
        </div>
      </Flipper>
    </WidgetCard>
  );
}
