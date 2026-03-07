import { useState } from "react";
import WidgetCard from "./WidgetCard.jsx";
import { industries } from "./data.js";

const tabs = Object.keys(industries);

export default function IndustrySwitchboard() {
  const [active, setActive] = useState(tabs[0]);
  return (
    <WidgetCard title="Industry Switchboard" subtitle="Discovery" badge={active} icon="⌁">
      <div className="widget-chip-wrap">
        {tabs.map((tab) => (
          <button key={tab} type="button" className={`chip-button ${active === tab ? 'active' : ''}`} onClick={() => setActive(tab)}>{tab}</button>
        ))}
      </div>
      <p className="muted">{industries[active].summary}</p>
      <ul className="content-list compact">
        {industries[active].bullets.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </WidgetCard>
  );
}
