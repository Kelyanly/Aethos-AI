import { getContextSlice } from "./siteContextService.js";

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434/api/chat";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "qwen2.5:3b";

const stateByAction = {
  page_load: "idle",
  hover_cta: "ctaReact",
  open_demo: "talk",
  ask_question: "talk",
  idle_timeout: "sleep",
};

const fallbackByAction = {
  page_load: {
    message: "Din_0: Want to explore a use case or estimate ROI first?",
    suggestedActions: [
      { label: "Explore AI Solutions", href: "/use-cases" },
      { label: "Try ROI Calculator", href: "/ai-roi-calculator" },
    ],
  },
  hover_cta: {
    message: "Best place to start: consultation.",
    suggestedActions: [{ label: "Book Consultation", href: "/book" }],
  },
  open_demo: {
    message: "Start with lead qualification, then compare ROI assumptions.",
    suggestedActions: [
      { label: "Run AI Playground", href: "/lab" },
      { label: "Open ROI Calculator", href: "/ai-roi-calculator" },
    ],
  },
  ask_question: {
    message: "I can guide you to demos, use cases, ROI, or booking.",
    suggestedActions: [
      { label: "AI Playground", href: "/lab" },
      { label: "Book Consultation", href: "/book" },
    ],
  },
};

function sanitizeActions(actions = [], allowlist = []) {
  const seen = new Set();
  const safe = [];

  for (const item of actions) {
    if (!item || typeof item !== "object") continue;
    const href = String(item.href || "").trim();
    const label = String(item.label || "").trim().slice(0, 48);
    if (!href || !label || !allowlist.includes(href) || seen.has(href)) continue;
    seen.add(href);
    safe.push({ label, href });
    if (safe.length >= 3) break;
  }

  return safe;
}

function sanitizeMessage(message = "") {
  return String(message || "").trim().slice(0, 160);
}

function sanitizeState(state = "idle") {
  const allowed = ["idle", "talk", "ctaReact", "sleep", "wake", "jump"];
  return allowed.includes(state) ? state : "idle";
}

function buildFallback({ userAction, allowlist }) {
  const payload = fallbackByAction[userAction] || fallbackByAction.ask_question;
  return {
    message: payload.message,
    suggestedActions: sanitizeActions(payload.suggestedActions, allowlist),
    state: sanitizeState(stateByAction[userAction] || "idle"),
    source: "fallback",
  };
}

function buildSystemPrompt() {
  return [
    "You are Din_0, the website companion for Aethos AI.",
    "You ONLY help users understand and navigate this website.",
    "Stay concise, premium, practical, and conversion-oriented.",
    "Allowed topics: services, pages, demos, ROI calculator, booking guidance.",
    "Never invent pricing, clients, external facts, or links.",
    "If user asks outside scope, politely redirect to relevant Aethos site actions.",
    "Output strictly valid JSON matching schema.",
  ].join(" ");
}

export async function getDin0Response(payload) {
  const context = await getContextSlice(payload);
  const fallback = buildFallback({ userAction: payload.userAction, allowlist: context.allowedActions });
  const rotatingHint =
    context.suggestions[Math.floor(Date.now() / 4000) % Math.max(1, context.suggestions.length)] || "";
  const dynamicFallback = {
    ...fallback,
    message: sanitizeMessage(`${fallback.message} ${rotatingHint}`),
  };

  const schema = {
    type: "object",
    properties: {
      message: { type: "string", maxLength: 160 },
      suggestedActions: {
        type: "array",
        maxItems: 3,
        items: {
          type: "object",
          properties: {
            label: { type: "string" },
            href: { type: "string" },
          },
          required: ["label", "href"],
          additionalProperties: false,
        },
      },
      state: { type: "string", enum: ["idle", "talk", "ctaReact", "sleep", "wake", "jump"] },
    },
    required: ["message", "suggestedActions", "state"],
    additionalProperties: false,
  };

  const userPrompt = {
    currentPage: payload.currentPage,
    section: payload.section,
    userAction: payload.userAction,
    userMessage: payload.userMessage || "",
    context,
  };

  try {
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: false,
        format: schema,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          { role: "user", content: JSON.stringify(userPrompt) },
        ],
      }),
    });

    if (!response.ok) {
      return dynamicFallback;
    }

    const data = await response.json();
    const raw = data?.message?.content;
    if (!raw) {
      return dynamicFallback;
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return dynamicFallback;
    }

    const safeActions = sanitizeActions(parsed.suggestedActions, context.allowedActions);
    const safeMessage = sanitizeMessage(parsed.message);

    if (!safeMessage) {
      return dynamicFallback;
    }

    return {
      message: safeMessage,
      suggestedActions: safeActions.length ? safeActions : dynamicFallback.suggestedActions,
      state: sanitizeState(parsed.state || dynamicFallback.state),
      source: "ollama",
    };
  } catch {
    return dynamicFallback;
  }
}
