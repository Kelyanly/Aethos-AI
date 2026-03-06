import express from "express";
import { getDin0Response } from "../services/din0LlmService.js";

const router = express.Router();

const allowedActions = new Set(["page_load", "hover_cta", "open_demo", "ask_question", "idle_timeout"]);

router.post("/respond", async (req, res) => {
  const currentPage = String(req.body?.currentPage || "/").trim();
  const section = String(req.body?.section || "general").trim();
  const userAction = String(req.body?.userAction || "ask_question").trim();
  const userMessage = String(req.body?.userMessage || "").trim();

  if (!allowedActions.has(userAction)) {
    return res.status(400).json({ error: "Invalid userAction." });
  }

  try {
    const response = await getDin0Response({
      currentPage,
      section,
      userAction,
      userMessage,
    });

    return res.json(response);
  } catch (error) {
    console.error("Din_0 respond error", error);
    return res.status(500).json({
      message: "Din_0 is currently unavailable. Try AI Playground or Book Consultation.",
      suggestedActions: [
        { label: "AI Playground", href: "/lab" },
        { label: "Book Consultation", href: "/book" },
      ],
      state: "idle",
      source: "error",
    });
  }
});

export default router;
