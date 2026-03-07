import { useEffect, useRef } from "react";
import DinoAvatar from "./dino/DinoAvatar.jsx";
import DinoPanel from "./dino/DinoPanel.jsx";
import Din0CodeCarousel from "./Din0CodeCarousel.jsx";
import SnakeLabPreview from "./SnakeLabPreview.jsx";
import useDin0Assistant from "../hooks/useDin0Assistant.js";

export default function Din0Companion({
  inViewport,
  ctaHovered,
  ctaClickSignal,
  chatActive,
  activitySignal,
  section = "hero",
}) {
  const { assistant, loading, progress, requestByAction } = useDin0Assistant(section);
  const hoverRef = useRef(false);
  const clickRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      requestByAction("ask_question");
    }, 14000);

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
      requestByAction("open_demo");
    }
  }, [ctaClickSignal, requestByAction]);

  useEffect(() => {
    if (activitySignal > 0 && activitySignal % 4 === 0) {
      requestByAction("ask_question");
    }
  }, [activitySignal, requestByAction]);

  async function handleAsk(message) {
    await requestByAction("ask_question", message);
  }

  return (
    <div className="din0-companion-block">
      <div className="dino-inline-header">
        <div className="dino-inline-visual-row">
          <div className="dino-inline-visual">
            <DinoAvatar
              inViewport={inViewport}
              ctaHovered={ctaHovered}
              ctaClickSignal={ctaClickSignal}
              chatActive={chatActive}
              activitySignal={activitySignal}
              className="dino-inline-avatar din0-wide-avatar"
            />
            <Din0CodeCarousel />
          </div>
          <SnakeLabPreview />
        </div>
        <div className="dino-inline-copy">
          <p className="muted small">Din_0 concierge</p>
          <p className="din0-guide-rotating">{loading ? "Din_0 is thinking..." : assistant.message}</p>
        </div>
      </div>

      <DinoPanel
        assistant={assistant}
        loading={loading}
        progress={progress}
        onRefresh={() => requestByAction("open_demo")}
        onAsk={handleAsk}
      />
    </div>
  );
}
