import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { requestDin0Response } from "../lib/din0Api.js";
import {
  buildLocalAssistantFallback,
  computeFeatureProgress,
  loadVisitedPages,
  persistVisitedPage,
} from "../agents/din0Concierge.js";

export default function useDin0Assistant(section = "hero") {
  const location = useLocation();
  const [, setTick] = useState(0);
  const [assistant, setAssistant] = useState(
    buildLocalAssistantFallback({ currentPage: location.pathname, userAction: "page_load", tick: 0 }),
  );
  const [loading, setLoading] = useState(false);
  const [visitedPages, setVisitedPages] = useState(() => loadVisitedPages());
  const sameMessageCountRef = useRef(0);
  const tickRef = useRef(0);

  const progress = useMemo(() => computeFeatureProgress(visitedPages), [visitedPages]);

  const fetchAssistant = useCallback(
    async (userAction, userMessage = "") => {
      setLoading(true);
      const localFallback = buildLocalAssistantFallback({
        currentPage: location.pathname,
        userAction,
        tick: tickRef.current,
      });

      try {
        const result = await requestDin0Response({
          currentPage: location.pathname,
          section,
          userAction,
          userMessage,
        });

        if (!result?.message) {
          setAssistant(localFallback);
          return;
        }

        setAssistant((current) => {
          if (current.message === result.message) {
            sameMessageCountRef.current += 1;
          } else {
            sameMessageCountRef.current = 0;
          }

          if (sameMessageCountRef.current >= 2) {
            return buildLocalAssistantFallback({
              currentPage: location.pathname,
              userAction,
              tick: tickRef.current + sameMessageCountRef.current,
            });
          }

          return result;
        });
      } catch {
        setAssistant(localFallback);
      } finally {
        setLoading(false);
      }
    },
    [location.pathname, section],
  );

  useEffect(() => {
    const merged = persistVisitedPage(location.pathname);
    setVisitedPages(merged);
    fetchAssistant("page_load");
  }, [fetchAssistant, location.pathname]);

  useEffect(() => {
    const timer = setInterval(() => {
      tickRef.current += 1;
      setTick(tickRef.current);
      setAssistant((current) => {
        if (current?.source && current.source !== "local-fallback") {
          return current;
        }
        return buildLocalAssistantFallback({
          currentPage: location.pathname,
          userAction: "ask_question",
          tick: tickRef.current,
        });
      });
    }, 12000);

    return () => clearInterval(timer);
  }, [location.pathname]);

  return {
    assistant,
    loading,
    progress,
    requestByAction: fetchAssistant,
  };
}
