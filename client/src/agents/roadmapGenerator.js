import { generateUseCases, inferProfile } from "./useCaseGenerator.js";

export function generateAiRoadmap({ industry, teamSize, monthlyLeads, monthlySupportTickets }) {
  const profile = industry || inferProfile("");
  const systems = generateUseCases(profile).systems;

  const leadImpact = Math.max(0, monthlyLeads * 0.22);
  const supportHoursSaved = (monthlySupportTickets * 8) / 60;
  const teamMultiplier = Math.max(1, teamSize / 10);
  const annualSavings = Math.round((leadImpact * 80 + supportHoursSaved * 42 * 12) * teamMultiplier);

  return {
    profile,
    roadmap: [
      `1) ${systems[0]}`,
      `2) ${systems[1]}`,
      `3) ${systems[2]}`,
    ],
    estimatedAnnualSavings: annualSavings,
  };
}
