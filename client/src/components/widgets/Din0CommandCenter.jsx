import { Link } from "react-router-dom";
import WidgetCard from "./WidgetCard.jsx";

export default function Din0CommandCenter() {
  return (
    <WidgetCard title="Din_0 Command Center" subtitle="Din_0" badge="Concierge" icon="◉">
      <p className="muted">Use Din_0 to move quickly between demos, ROI, and booking without losing context.</p>
      <div className="widget-chip-wrap">
        <Link className="chip-button" to="/lab">Try Playground</Link>
        <Link className="chip-button" to="/ai-roi-calculator">Calculate ROI</Link>
        <Link className="chip-button" to="/book">Book</Link>
      </div>
    </WidgetCard>
  );
}
