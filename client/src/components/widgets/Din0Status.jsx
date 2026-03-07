import { useEffect, useState } from "react";
import WidgetCard from "./WidgetCard.jsx";

const statuses = [
  "Din_0 is scanning the current page for the next best action...",
  "Din_0 is matching this visitor flow to a likely use case...",
  "Din_0 is checking whether ROI or demo is the better next step...",
  "Din_0 is preparing a shorter route to consultation...",
];

export default function Din0Status() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % statuses.length), 2800);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <WidgetCard title="What's Din_0 doing?" subtitle="Din_0" badge="Status" icon="●">
      <p className="widget-inline-note">{statuses[index]}</p>
    </WidgetCard>
  );
}
