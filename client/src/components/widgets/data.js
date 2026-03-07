export const widgetCategories = [
  "All",
  "Discovery",
  "ROI",
  "Din_0",
  "Architecture",
  "Trust",
];

export const heatmapPoints = [
  { name: "Lead qualification", effort: 2, impact: 5, automation: 60 },
  { name: "Knowledge search", effort: 3, impact: 5, automation: 70 },
  { name: "Support triage", effort: 3, impact: 4, automation: 48 },
  { name: "Proposal prep", effort: 2, impact: 4, automation: 42 },
  { name: "Meeting booking", effort: 1, impact: 3, automation: 35 },
  { name: "CRM updates", effort: 4, impact: 4, automation: 50 },
];

export const roiTickerMetrics = [
  { label: "Hours reclaimed", value: 56, suffix: "/mo" },
  { label: "Qualified leads", value: 38, suffix: "/mo" },
  { label: "Annual value", value: 52000, prefix: "EUR " },
];

export const bottleneckData = {
  Sales: [
    "Inbound forms arrive without qualification.",
    "Follow-up depends on manual inbox triage.",
    "CRM context is re-entered by hand.",
  ],
  Support: [
    "Teams answer the same recurring questions repeatedly.",
    "Urgent requests are mixed with routine tickets.",
    "Knowledge lives across inboxes and docs.",
  ],
  Ops: [
    "Workflow steps are remembered instead of enforced.",
    "Internal handoffs create avoidable latency.",
    "Managers lack a quick view of repetitive work.",
  ],
};

export const trustCards = [
  { title: "Service teams", metric: "50% less manual triage" },
  { title: "SME lead funnels", metric: "24/7 qualification coverage" },
  { title: "Knowledge operations", metric: "70% faster internal retrieval" },
  { title: "Ops leaders", metric: "Weeks to pilot, not quarters" },
];

export const industries = {
  Agency: {
    summary: "Automate lead capture, proposal briefing, and client intake.",
    bullets: ["Score incoming leads before a manual call.", "Generate better project briefs.", "Reduce repetitive qualification work."],
  },
  "Real Estate": {
    summary: "Filter serious buyers, route high-intent leads, and accelerate booking.",
    bullets: ["Capture buyer intent early.", "Prioritize high-fit inquiries.", "Route meetings without inbox bottlenecks."],
  },
  Accounting: {
    summary: "Streamline advisory triage and frequent client questions.",
    bullets: ["Answer recurring policy questions.", "Flag advisory opportunities faster.", "Reduce repetitive intake effort."],
  },
};

export const architectureSteps = [
  "Website or inbox entry point",
  "Din_0 or assistant layer",
  "Policies and routing rules",
  "LLM + retrieval + orchestration",
  "CRM, docs, and workflow systems",
];

export const integrationTags = [
  "HubSpot",
  "Slack",
  "Calendly",
  "Gmail",
  "Notion",
  "Drive",
  "Airtable",
  "Zapier",
];

export const promptExamples = [
  "Qualify this lead based on budget, timeline, and fit.",
  "Summarize this support thread into a CRM-ready update.",
  "Find the most relevant policy answer from internal docs.",
  "Draft a follow-up email based on this meeting note.",
  "Extract the next best action from this ops request.",
  "Compare two project briefs and flag missing information.",
];

export const roadmapSteps = [
  { week: "Week 1", title: "Discovery", copy: "Map repetitive workflows and define one measurable target." },
  { week: "Week 2", title: "Prototype", copy: "Build a bounded assistant with routing logic and approved sources." },
  { week: "Week 3-4", title: "Pilot", copy: "Validate with real requests and iterate on quality thresholds." },
  { week: "Week 5", title: "Deployment", copy: "Connect systems, establish ownership, and monitor live usage." },
];

export const widgetMeta = [
  { key: "opportunity-heatmap", title: "AI Opportunity Heatmap", category: "Discovery" },
  { key: "roi-ticker", title: "ROI Ticker", category: "ROI" },
  { key: "din0-command-center", title: "Din_0 Command Center", category: "Din_0" },
  { key: "workflow-bottleneck-finder", title: "Workflow Bottleneck Finder", category: "Discovery" },
  { key: "agent-builder-preview", title: "Agent Builder Preview", category: "Architecture" },
  { key: "live-demo-launcher", title: "Live Demo Launcher", category: "Discovery" },
  { key: "trust-signals-carousel", title: "Trust Signals Carousel", category: "Trust" },
  { key: "case-study-snapshot", title: "Case Study Snapshot", category: "Trust" },
  { key: "industry-switchboard", title: "Industry Switchboard", category: "Discovery" },
  { key: "stack-explorer", title: "Stack Explorer", category: "Architecture" },
  { key: "integration-cloud", title: "Integration Cloud", category: "Architecture" },
  { key: "privacy-box", title: "Privacy Box", category: "Trust" },
  { key: "knowledge-coverage-meter", title: "Knowledge Coverage Meter", category: "Architecture" },
  { key: "prompt-library-mini", title: "Prompt Library Mini", category: "Discovery" },
  { key: "quality-simulator", title: "Quality Simulator", category: "Architecture" },
  { key: "lead-scorecard", title: "Lead Scorecard", category: "ROI" },
  { key: "automation-mini-calc", title: "Automation Mini Calc", category: "ROI" },
  { key: "roadmap-timeline", title: "Roadmap Timeline", category: "Architecture" },
  { key: "din0-status", title: "Din_0 Status", category: "Din_0" },
  { key: "rive-micro-illustrations", title: "Rive Micro Illustrations", category: "Din_0" },
];
