import WidgetCard from "./WidgetCard.jsx";
import { trustCards } from "./data.js";

export default function TrustSignalsCarousel() {
  const items = [...trustCards, ...trustCards];
  return (
    <WidgetCard title="Trust Signals Carousel" subtitle="Trust" badge="Benchmarks" icon="◆">
      <div className="widget-marquee" aria-label="Representative outcomes">
        <div className="widget-marquee-track">
          {items.map((item, index) => (
            <div key={`${item.title}-${index}`} className="widget-mini-card">
              <strong>{item.metric}</strong>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
}
