import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PromptCarousel from "./PromptCarousel.jsx";
import useDin0Assistant from "../hooks/useDin0Assistant.js";

const fallbackPrompts = [
  "Explore AI Solutions",
  "Try the AI Playground",
  "Calculate ROI",
  "Book a Consultation",
];

export default function DynamicIslandAssistant() {
  const [collapsed, setCollapsed] = useState(false);
  const [dismissCount, setDismissCount] = useState(() => Number(window.localStorage.getItem("din0_island_dismiss") || "0"));
  const { assistant, requestByAction } = useDin0Assistant("hero_island");

  useEffect(() => {
    const timer = setTimeout(() => {
      requestByAction("ask_question");
    }, 7000);

    return () => clearTimeout(timer);
  }, [requestByAction]);

  function dismiss() {
    const next = dismissCount + 1;
    setDismissCount(next);
    window.localStorage.setItem("din0_island_dismiss", String(next));
    setCollapsed(true);
  }

  if (collapsed) {
    return (
      <button type="button" className="dynamic-island collapsed" onClick={() => setCollapsed(false)}>
        Din_0 assistant
      </button>
    );
  }

  const prompts = assistant?.message ? [assistant.message, ...fallbackPrompts] : fallbackPrompts;

  return (
    <div className="dynamic-island" role="status" aria-live="polite">
      <PromptCarousel items={prompts} className="dynamic-island-text" />
      <div className="dynamic-island-actions">
        <Link to="/book" className="dynamic-island-link">Assess</Link>
        <button type="button" className="dynamic-island-dismiss" onClick={dismiss}>
          {dismissCount > 1 ? "Mute" : "Dismiss"}
        </button>
      </div>
    </div>
  );
}
