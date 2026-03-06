import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Din_0 state transitions are intentionally explicit so product UX can tie mascot
 * behavior to conversion actions (CTA hover/click), inactivity, and chat activity.
 */
export default function useDin0StateMachine({
  inViewport,
  ctaHovered,
  ctaClickSignal,
  chatActive,
  activitySignal,
  inactivityMs = 6000,
}) {
  const [state, setState] = useState("idle");
  const lastActivityRef = useRef(Date.now());

  const markActive = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  // Hero activity resets inactivity timer.
  useEffect(() => {
    markActive();
  }, [activitySignal, markActive]);

  // Chat takes priority and puts Din_0 in talking mode while active.
  useEffect(() => {
    if (!inViewport) {
      return;
    }

    if (chatActive) {
      markActive();
      setState((current) => (current === "jump" || current === "wake" ? current : "talk"));
      return;
    }

    setState((current) => (current === "talk" ? "idle" : current));
  }, [chatActive, inViewport, markActive]);

  // CTA hover triggers attention reaction.
  useEffect(() => {
    if (!inViewport) {
      return;
    }

    if (ctaHovered) {
      markActive();
      setState((current) => (current === "jump" || current === "wake" ? current : "ctaReact"));
      return;
    }

    setState((current) => (current === "ctaReact" ? "idle" : current));
  }, [ctaHovered, inViewport, markActive]);

  // Primary CTA click runs a short non-loop jump reaction.
  useEffect(() => {
    if (!inViewport || ctaClickSignal === 0) {
      return;
    }

    markActive();
    setState("jump");
  }, [ctaClickSignal, inViewport, markActive]);

  // If no activity is detected in hero, Din_0 goes to sleep.
  useEffect(() => {
    if (!inViewport) {
      return;
    }

    const timer = setInterval(() => {
      const inactive = Date.now() - lastActivityRef.current >= inactivityMs;

      if (!inactive) {
        return;
      }

      setState((current) => {
        if (chatActive || ctaHovered || current === "jump" || current === "wake") {
          return current;
        }

        return current === "idle" ? "sleep" : current;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [chatActive, ctaHovered, inViewport, inactivityMs]);

  // Hovering Din_0 wakes it up only if sleeping.
  const wakeDin0 = useCallback(() => {
    markActive();
    setState((current) => (current === "sleep" ? "wake" : current));
  }, [markActive]);

  // Non-loop states return to a sensible ongoing state.
  const onNonLoopEnd = useCallback(
    (finishedState) => {
      if (finishedState !== "wake" && finishedState !== "jump") {
        return;
      }

      setState(() => {
        if (chatActive) {
          return "talk";
        }

        if (ctaHovered) {
          return "ctaReact";
        }

        return "idle";
      });
      markActive();
    },
    [chatActive, ctaHovered, markActive],
  );

  return {
    state,
    wakeDin0,
    markActive,
    onNonLoopEnd,
  };
}
