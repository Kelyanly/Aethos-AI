const PAGE_CONFIG = {
  "/": {
    prompts: [
      "Din_0: Want a quick AI use-case idea?",
      "Curious what AI could automate in your business?",
      "Need help choosing between demos and ROI first?",
    ],
    actions: [
      { label: "Explore AI Solutions", href: "/use-cases" },
      { label: "Try AI Demo", href: "/lab" },
      { label: "Book Consultation", href: "/book" },
    ],
  },
  "/lab": {
    prompts: [
      "Try the lead qualification demo first.",
      "Ask the knowledge assistant one business question.",
      "Use demo values before moving to ROI.",
    ],
    actions: [
      { label: "Run AI Playground", href: "/lab" },
      { label: "Try ROI Calculator", href: "/ai-roi-calculator" },
      { label: "Book Consultation", href: "/book" },
    ],
  },
  "/ai-opportunity-studio": {
    prompts: [
      "Describe one repetitive task to start.",
      "Generate your top three AI opportunities.",
      "Use result insights before booking a call.",
    ],
    actions: [
      { label: "Generate Roadmap", href: "/ai-opportunity-studio" },
      { label: "Try ROI Calculator", href: "/ai-roi-calculator" },
      { label: "Book Consultation", href: "/book" },
    ],
  },
  "/ai-roi-calculator": {
    prompts: [
      "Use demo values for a quick ROI baseline.",
      "Compare support and lead workloads before deciding.",
      "Need help validating assumptions? Book a consultation.",
    ],
    actions: [
      { label: "Use ROI Tool", href: "/ai-roi-calculator" },
      { label: "Explore Use Cases", href: "/use-cases" },
      { label: "Book Consultation", href: "/book" },
    ],
  },
};

const DEFAULT_CONFIG = {
  prompts: [
    "Want help exploring AI automation opportunities?",
    "Need a quick tour of the most useful pages?",
    "I can guide you to demos, ROI, or consultation.",
  ],
  actions: [
    { label: "Explore AI Solutions", href: "/use-cases" },
    { label: "Try AI Demo", href: "/lab" },
    { label: "Book Consultation", href: "/book" },
  ],
};

const ACTION_STATE_MAP = {
  page_load: "idle",
  hover_cta: "ctaReact",
  open_demo: "talk",
  ask_question: "talk",
  idle_timeout: "sleep",
};

function getPageConfig(page = "/") {
  return PAGE_CONFIG[page] || DEFAULT_CONFIG;
}

export function getConciergePrompt(page, tick = 0) {
  const { prompts } = getPageConfig(page);
  if (!prompts.length) {
    return DEFAULT_CONFIG.prompts[0];
  }
  const index = Math.abs(tick) % prompts.length;
  return prompts[index];
}

export function getConciergeActions(page) {
  return getPageConfig(page).actions;
}

export function buildLocalAssistantFallback({
  currentPage = "/",
  userAction = "page_load",
  tick = 0,
}) {
  return {
    message: getConciergePrompt(currentPage, tick),
    suggestedActions: getConciergeActions(currentPage),
    state: ACTION_STATE_MAP[userAction] || "idle",
    source: "local-fallback",
  };
}

const FEATURE_MILESTONES = ["/use-cases", "/lab", "/ai-roi-calculator", "/book"];

export function computeFeatureProgress(visitedPages = []) {
  const visitedSet = new Set(visitedPages);
  const explored = FEATURE_MILESTONES.filter((path) => visitedSet.has(path)).length;
  return {
    explored,
    total: FEATURE_MILESTONES.length,
  };
}

export function persistVisitedPage(pathname) {
  try {
    const raw = window.localStorage.getItem("din0_visited_pages");
    const existing = raw ? JSON.parse(raw) : [];
    const merged = Array.from(new Set([...existing, pathname]));
    window.localStorage.setItem("din0_visited_pages", JSON.stringify(merged));
    return merged;
  } catch {
    return [pathname];
  }
}

export function loadVisitedPages() {
  try {
    const raw = window.localStorage.getItem("din0_visited_pages");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
