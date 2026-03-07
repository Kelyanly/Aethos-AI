import { useEffect, useState } from "react";
import WidgetCard from "./WidgetCard.jsx";
import { roiTickerMetrics } from "./data.js";

function useTicker(target) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame;
    const started = performance.now();
    const duration = 900;
    const loop = (timestamp) => {
      const progress = Math.min((timestamp - started) / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return value;
}

export default function ROITicker() {
  const values = roiTickerMetrics.map((item) => useTicker(item.value));
  return (
    <WidgetCard title="ROI Ticker" subtitle="ROI" badge="Live-style mock" icon="↗">
      <div className="widget-metric-list">
        {roiTickerMetrics.map((item, index) => (
          <div key={item.label} className="widget-metric-row">
            <span>{item.label}</span>
            <strong>{item.prefix || ""}{values[index].toLocaleString("en-US")}{item.suffix || ""}</strong>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
