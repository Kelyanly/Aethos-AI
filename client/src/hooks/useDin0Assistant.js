import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { requestDin0Response } from "../lib/din0Api.js";

const fallback = {
  message: "Din_0: Want to explore demos, ROI, or consultation next?",
  suggestedActions: [
    { label: "AI Playground", href: "/lab" },
    { label: "Get Assessment", href: "/book" },
  ],
  state: "idle",
};

export default function useDin0Assistant(section = "hero") {
  const location = useLocation();
  const [assistant, setAssistant] = useState(fallback);
  const [loading, setLoading] = useState(false);

  const fetchAssistant = useCallback(
    async (userAction, userMessage = "") => {
      setLoading(true);
      try {
        const result = await requestDin0Response({
          currentPage: location.pathname,
          section,
          userAction,
          userMessage,
        });
        setAssistant(result);
      } catch {
        setAssistant(fallback);
      } finally {
        setLoading(false);
      }
    },
    [location.pathname, section],
  );

  useEffect(() => {
    fetchAssistant("page_load");
  }, [fetchAssistant]);

  return {
    assistant,
    loading,
    requestByAction: fetchAssistant,
  };
}
