export function suggestRoiPreset({ industry = "service", employees = 15 } = {}) {
  const presets = {
    agency: { monthlyLeads: 120, monthlySupportTickets: 80, avgMinutes: 12, hourlyCost: 45 },
    accounting: { monthlyLeads: 70, monthlySupportTickets: 140, avgMinutes: 14, hourlyCost: 55 },
    real_estate: { monthlyLeads: 180, monthlySupportTickets: 60, avgMinutes: 10, hourlyCost: 42 },
    saas: { monthlyLeads: 210, monthlySupportTickets: 420, avgMinutes: 8, hourlyCost: 50 },
    service: { monthlyLeads: 90, monthlySupportTickets: 160, avgMinutes: 11, hourlyCost: 40 },
  };

  const p = presets[industry] ?? presets.service;

  return {
    employees,
    monthlyLeads: p.monthlyLeads,
    monthlySupportTickets: p.monthlySupportTickets,
    timePerSupportRequest: p.avgMinutes,
    hourlyCost: p.hourlyCost,
  };
}

export function summarizeAutomationPotential(taskDescription = "") {
  const lower = taskDescription.toLowerCase();
  let score = 42;

  if (/(copy|paste|manual|repetitive|follow-up|ticket|email)/.test(lower)) score += 16;
  if (/(approval|compliance|complex legal|high risk)/.test(lower)) score -= 10;
  if (/(customer support|lead qualification|intake|onboarding)/.test(lower)) score += 9;

  score = Math.max(18, Math.min(82, score));

  return {
    automationPotential: score,
    recommendation:
      score > 55
        ? "High automation fit: deploy an AI assistant plus workflow automation."
        : "Good automation fit: start with assistant-guided triage, then automate downstream steps.",
  };
}
