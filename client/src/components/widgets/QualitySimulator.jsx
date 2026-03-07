import { useState } from "react";
import WidgetCard from "./WidgetCard.jsx";

const responses = {
  baseline: "Generic answer, weak context, no grounded next action.",
  grounded: "Policy-aware answer with internal context, clearer routing, and a defined next step.",
};

export default function QualitySimulator() {
  const [mode, setMode] = useState("grounded");
  return (
    <WidgetCard title="Response Quality Simulator" subtitle="Architecture" badge={mode === 'grounded' ? 'With RAG' : 'No RAG'} icon="◫">
      <div className="widget-chip-wrap">
        <button type="button" className={`chip-button ${mode === 'baseline' ? 'active' : ''}`} onClick={() => setMode('baseline')}>No RAG</button>
        <button type="button" className={`chip-button ${mode === 'grounded' ? 'active' : ''}`} onClick={() => setMode('grounded')}>With RAG</button>
      </div>
      <p className="widget-inline-note">{responses[mode]}</p>
    </WidgetCard>
  );
}
