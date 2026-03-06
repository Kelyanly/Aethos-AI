import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Din0Sprite from "./Din0Sprite.jsx";
import useDin0Assistant from "../hooks/useDin0Assistant.js";

export default function Din0Companion({
  inViewport,
  ctaHovered,
  ctaClickSignal,
  chatActive,
  activitySignal,
  section = "hero",
}) {
  const { assistant, loading, requestByAction } = useDin0Assistant(section);
  const hoverRef = useRef(false);
  const clickRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      requestByAction("ask_question");
    }, 9000);

    return () => clearInterval(timer);
  }, [requestByAction]);

  useEffect(() => {
    if (ctaHovered && !hoverRef.current) {
      requestByAction("hover_cta");
    }
    hoverRef.current = ctaHovered;
  }, [ctaHovered, requestByAction]);

  useEffect(() => {
    if (ctaClickSignal !== 0 && ctaClickSignal !== clickRef.current) {
      clickRef.current = ctaClickSignal;
      requestByAction("hover_cta");
    }
  }, [ctaClickSignal, requestByAction]);

  useEffect(() => {
    if (activitySignal > 0 && activitySignal % 3 === 0) {
      requestByAction("ask_question");
    }
  }, [activitySignal, requestByAction]);

  return (
    <div className="din0-companion-block">
      <Din0Sprite
        inViewport={inViewport}
        ctaHovered={ctaHovered}
        ctaClickSignal={ctaClickSignal}
        chatActive={chatActive}
        activitySignal={activitySignal}
        showBubble={false}
      />

      <div className="din0-guide-actions">
        <p className="muted small">Din_0 Assistant</p>
        <p className="din0-guide-rotating">{loading ? "Din_0 is thinking..." : assistant.message}</p>

        <div className="din0-action-links">
          {assistant.suggestedActions.map((action) => (
            action.href.startsWith("/") ? (
              <Link
                key={action.href}
                className={`btn ${action.href === "/book" ? "btn-primary" : "btn-secondary"}`}
                to={action.href}
              >
                {action.label}
              </Link>
            ) : (
              <button key={action.href} type="button" className="btn btn-secondary">
                {action.label}
              </button>
            )
          ))}
          <button type="button" className="btn btn-secondary" onClick={() => requestByAction("open_demo")}>
            Refresh Suggestions
          </button>
        </div>
      </div>
    </div>
  );
}
