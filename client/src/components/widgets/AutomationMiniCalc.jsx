import { useMemo, useState } from "react";
import WidgetCard from "./WidgetCard.jsx";

export default function AutomationMiniCalc() {
  const [tickets, setTickets] = useState(320);
  const [minutes, setMinutes] = useState(11);
  const hours = useMemo(() => Math.round((tickets * minutes * 0.38) / 60), [tickets, minutes]);
  return (
    <WidgetCard title="Automation Mini Calc" subtitle="ROI" badge={`${hours}h`} icon="⧖">
      <label className="widget-range-row">
        <span>Monthly requests</span>
        <input type="range" min="50" max="600" value={tickets} onChange={(event) => setTickets(Number(event.target.value))} />
      </label>
      <label className="widget-range-row">
        <span>Minutes per request</span>
        <input type="range" min="5" max="30" value={minutes} onChange={(event) => setMinutes(Number(event.target.value))} />
      </label>
      <p className="small muted">Estimated reclaimable hours at 38% automation potential: {hours} per month.</p>
    </WidgetCard>
  );
}
