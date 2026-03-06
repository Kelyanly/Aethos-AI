import { useState } from "react";
import { Link } from "react-router-dom";
import PromptCarousel from "./PromptCarousel.jsx";

const prompts = [
  "Explore AI Solutions",
  "Try the AI Playground",
  "Calculate ROI",
  "Get Your AI Opportunity Assessment",
];

export default function DynamicIslandAssistant() {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <button type="button" className="dynamic-island collapsed" onClick={() => setCollapsed(false)}>
        AI Assistant
      </button>
    );
  }

  return (
    <div className="dynamic-island" role="status" aria-live="polite">
      <PromptCarousel items={prompts} className="dynamic-island-text" />
      <div className="dynamic-island-actions">
        <Link to="/book" className="dynamic-island-link">Assess</Link>
        <button type="button" className="dynamic-island-dismiss" onClick={() => setCollapsed(true)}>
          Dismiss
        </button>
      </div>
    </div>
  );
}
