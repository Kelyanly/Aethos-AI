export const rotatingPrompts = [
  "Want to see a real AI use case?",
  "Curious about automation ROI?",
  "Need an AI assistant for your website?",
  "Want a 30-second tour of Aethos AI?",
];

export const companyTypeOptions = [
  { key: "agency", label: "Agency" },
  { key: "real_estate", label: "Real estate" },
  { key: "accounting", label: "Accounting firm" },
  { key: "saas", label: "SaaS startup" },
];

export function companyTypeToRecommendation(type) {
  const map = {
    agency: "Lead qualification AI + proposal assistant are usually the highest-impact start.",
    real_estate: "Lead scoring assistant and appointment triage provide immediate value.",
    accounting: "Knowledge assistant + intake qualification usually reduces manual back-and-forth.",
    saas: "Support assistant + onboarding knowledge assistant are typically strong first pilots.",
  };

  return map[type] ?? "A lead qualification assistant is a practical first implementation.";
}
