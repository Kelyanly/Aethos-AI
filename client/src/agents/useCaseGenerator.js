const templates = {
  agency: [
    "AI lead qualification assistant for inbound forms and chat.",
    "AI proposal drafting assistant connected to service templates.",
    "AI campaign reporting bot that summarizes KPI performance weekly.",
  ],
  accounting: [
    "AI pre-qualification assistant for tax and advisory requests.",
    "Internal AI knowledge assistant for compliance and process docs.",
    "Workflow automation for onboarding and recurring document requests.",
  ],
  real_estate: [
    "Lead intent qualification assistant for buyer and seller inquiries.",
    "Appointment scheduling assistant with lead scoring rules.",
    "Property Q&A assistant connected to your listing data.",
  ],
  saas: [
    "AI support copilot for repetitive customer questions.",
    "Product knowledge assistant for onboarding and activation.",
    "Lead qualification assistant with CRM routing automation.",
  ],
  service: [
    "AI intake assistant to capture and qualify service requests.",
    "Internal knowledge assistant for SOPs and delivery guidance.",
    "Workflow automation for repetitive operational handoffs.",
  ],
};

export function inferProfile(text = "") {
  const lower = text.toLowerCase();
  if (/(agency|marketing|creative)/.test(lower)) return "agency";
  if (/(accounting|tax|bookkeeping|audit)/.test(lower)) return "accounting";
  if (/(real estate|property|buyer|seller)/.test(lower)) return "real_estate";
  if (/(saas|software|startup|product)/.test(lower)) return "saas";
  return "service";
}

export function generateUseCases(description = "") {
  const profile = inferProfile(description);
  return {
    profile,
    systems: templates[profile],
  };
}
