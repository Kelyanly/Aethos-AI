import { buildOpportunityPrompt } from "./opportunityPromptBuilder.js";
import { normalizeResult } from "./resultParser.js";

let generatorPromise = null;

const MODEL_ID = "Xenova/flan-t5-small";

function isWebGpuAvailable() {
  return typeof navigator !== "undefined" && Boolean(navigator.gpu);
}

async function loadGenerator() {
  if (generatorPromise) {
    return generatorPromise;
  }

  generatorPromise = (async () => {
    const { pipeline, env } = await import("@huggingface/transformers");
    env.allowLocalModels = false;

    const device = isWebGpuAvailable() ? "webgpu" : "wasm";
    return pipeline("text2text-generation", MODEL_ID, { device });
  })();

  return generatorPromise;
}

function fallbackResult(mode, inputs) {
  const defaults = {
    use_cases: {
      summary: `Priority opportunities for ${inputs.industry || "service business"}.`,
      opportunityScore: 46,
      estimatedHoursSaved: 70,
      estimatedAnnualValue: 52000,
      items: [
        { title: "AI Lead Qualification Assistant", description: "Qualify inbound leads before manual follow-up.", impact: "High" },
        { title: "AI Knowledge Assistant", description: "Provide instant answers from internal SOP and service docs.", impact: "Medium" },
        { title: "Workflow Automation Layer", description: "Automate repetitive routing and CRM updates.", impact: "Medium" },
      ],
      roadmap: ["Week 1 - Discovery", "Week 2 - Prototype", "Week 3-4 - Pilot", "Week 5 - Deployment"],
      firstStep: "Pilot one lead qualification flow with clear KPI tracking.",
      recommendedPage: "/ai-roi-calculator",
    },
    workflow: {
      summary: "Manual flow contains repeated handoffs and response delays.",
      opportunityScore: 41,
      estimatedHoursSaved: 56,
      estimatedAnnualValue: 41000,
      items: [
        { title: "Intake Automation", description: "Capture request details in structured format.", impact: "High" },
        { title: "Triage Assistant", description: "Route requests by urgency and service fit.", impact: "Medium" },
        { title: "Follow-up Automation", description: "Trigger status updates and reminders automatically.", impact: "Medium" },
      ],
      roadmap: ["Week 1 - Discovery", "Week 2 - Prototype", "Week 3-4 - Pilot", "Week 5 - Deployment"],
      firstStep: "Automate intake + triage for one workflow first.",
      recommendedPage: "/lab",
    },
    roadmap: {
      summary: "Three-phase roadmap focused on fast measurable value.",
      opportunityScore: 52,
      estimatedHoursSaved: 78,
      estimatedAnnualValue: 61000,
      items: [
        { title: "Phase 1", description: "Deploy lead/intake assistant in one channel.", impact: "High" },
        { title: "Phase 2", description: "Connect knowledge base and quality guardrails.", impact: "Medium" },
        { title: "Phase 3", description: "Expand automation to CRM and operations.", impact: "Medium" },
      ],
      roadmap: ["Week 1 - Discovery", "Week 2 - Prototype", "Week 3-4 - Pilot", "Week 5 - Deployment"],
      firstStep: "Define one measurable pilot objective for 30 days.",
      recommendedPage: "/book",
    },
    readiness: {
      summary: "Readiness appears moderate with good pilot potential.",
      opportunityScore: 38,
      estimatedHoursSaved: 48,
      estimatedAnnualValue: 36000,
      items: [
        { title: "AI readiness score", description: "64/100 based on process repetition and volume.", impact: "Medium" },
      ],
      roadmap: ["Week 1 - Discovery", "Week 2 - Prototype", "Week 3-4 - Pilot", "Week 5 - Deployment"],
      firstStep: "Start with a single high-friction workflow pilot.",
      recommendedPage: "/ai-roi-calculator",
    },
  };

  return defaults[mode] || defaults.use_cases;
}

export async function generateOpportunity(mode, inputs) {
  const fallback = fallbackResult(mode, inputs);
  const prompt = buildOpportunityPrompt(mode, inputs);

  try {
    const generator = await loadGenerator();
    const out = await generator(prompt, {
      max_new_tokens: 220,
      temperature: 0.2,
      top_p: 0.9,
      repetition_penalty: 1.15,
    });

    const text = Array.isArray(out) ? out[0]?.generated_text : out?.generated_text;
    return normalizeResult(text, fallback);
  } catch {
    return fallback;
  }
}

export function getModelStatus() {
  return {
    modelId: MODEL_ID,
    webgpu: isWebGpuAvailable(),
  };
}
