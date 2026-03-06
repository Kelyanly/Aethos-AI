const baseInstruction = [
  "You are an AI consulting opportunity generator for Aethos AI.",
  "Stay concise, business-focused, and structured.",
  "No pricing claims, no fake case studies, no external facts.",
  "Return only JSON in the expected schema.",
].join(" ");

const modeSchemas = {
  use_cases: {
    schema: {
      summary: "short summary",
      items: [{ title: "use case title", description: "short description", impact: "Low|Medium|High" }],
      firstStep: "first implementation step",
      recommendedPage: "/ai-roi-calculator",
    },
    instruction:
      "Generate exactly 3 relevant AI use cases from the provided business context with practical implementation language.",
  },
  workflow: {
    schema: {
      summary: "workflow summary",
      items: [{ title: "automation opportunity", description: "what to automate", impact: "Low|Medium|High" }],
      firstStep: "pilot recommendation",
      recommendedPage: "/lab",
    },
    instruction:
      "Summarize the workflow and list 3 automation opportunities plus one pilot idea.",
  },
  roadmap: {
    schema: {
      summary: "roadmap summary",
      items: [
        { title: "Phase 1", description: "phase detail", impact: "High" },
        { title: "Phase 2", description: "phase detail", impact: "Medium" },
        { title: "Phase 3", description: "phase detail", impact: "Medium" },
      ],
      firstStep: "first implementation step",
      recommendedPage: "/book",
    },
    instruction:
      "Build a practical 3-phase roadmap with one immediate first step.",
  },
  readiness: {
    schema: {
      summary: "readiness snapshot",
      items: [{ title: "AI readiness score", description: "0-100 with short reason", impact: "Low|Medium|High" }],
      firstStep: "best next action",
      recommendedPage: "/ai-roi-calculator",
    },
    instruction:
      "Estimate AI readiness from the provided inputs and suggest one best next action.",
  },
};

export function buildOpportunityPrompt(mode, inputs) {
  const modeConfig = modeSchemas[mode] || modeSchemas.use_cases;

  return [
    baseInstruction,
    modeConfig.instruction,
    `Schema example: ${JSON.stringify(modeConfig.schema)}`,
    `User inputs: ${JSON.stringify(inputs)}`,
  ].join("\n");
}
