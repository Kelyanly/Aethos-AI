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

    const items = Array.isArray(parsed.items)
      ? parsed.items.slice(0, 3).map((item) => ({
          title: String(item.title || "Opportunity").slice(0, 100),
          description: String(item.description || "").slice(0, 180),
          impact: ["Low", "Medium", "High"].includes(item.impact) ? item.impact : "Medium",
        }))
      : fallback.items;

    return {
      summary,
      items: items.length ? items : fallback.items,
      firstStep,
      recommendedPage,
    };
  } catch {
    return fallback;
  }
}
