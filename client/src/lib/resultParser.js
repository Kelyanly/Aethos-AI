function extractJson(text) {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : null;
}

export function normalizeResult(rawText, fallback) {
  if (!rawText) {
    return fallback;
  }

  const candidate = extractJson(rawText);
  if (!candidate) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(candidate);
    const summary = String(parsed.summary || fallback.summary).slice(0, 220);
    const firstStep = String(parsed.firstStep || fallback.firstStep).slice(0, 220);
    const recommendedPage = String(parsed.recommendedPage || fallback.recommendedPage);
    const opportunityScore = Number(parsed.opportunityScore || fallback.opportunityScore || 0);
    const estimatedHoursSaved = Number(parsed.estimatedHoursSaved || fallback.estimatedHoursSaved || 0);
    const estimatedAnnualValue = Number(parsed.estimatedAnnualValue || fallback.estimatedAnnualValue || 0);
    const roadmap = Array.isArray(parsed.roadmap)
      ? parsed.roadmap.slice(0, 4).map((step) => String(step).slice(0, 80))
      : fallback.roadmap || [];

    const items = Array.isArray(parsed.items)
      ? parsed.items.slice(0, 3).map((item) => ({
          title: String(item.title || "Opportunity").slice(0, 100),
          description: String(item.description || "").slice(0, 180),
          impact: ["Low", "Medium", "High"].includes(item.impact) ? item.impact : "Medium",
        }))
      : fallback.items;

    return {
      summary,
      opportunityScore,
      estimatedHoursSaved,
      estimatedAnnualValue,
      items: items.length ? items : fallback.items,
      roadmap,
      firstStep,
      recommendedPage,
    };
  } catch {
    return fallback;
  }
}
