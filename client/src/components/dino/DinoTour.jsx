import { Link } from "react-router-dom";

const tourLinks = [
  { label: "AI Opportunity Studio", href: "/ai-opportunity-studio" },
  { label: "AI Playground", href: "/lab" },
  { label: "ROI Calculator", href: "/ai-roi-calculator" },
  { label: "Consultation", href: "/book" },
];

export default function DinoTour({ progress }) {
  return (
    <div className="dino-tour" aria-label="Din_0 discovery tour">
      <p className="small muted">Feature discovery</p>
      <p className="dino-tour-progress">
        You explored {progress.explored}/{progress.total} AI tools
      </p>
      <div className="dino-tour-links">
        {tourLinks.map((item) => (
          <Link key={item.href} className="chip-button" to={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
