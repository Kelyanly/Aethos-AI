export default function Din0InsightPanel({ mode, result, loading }) {
  if (loading) {
    return <p className="muted small">Din_0 is thinking...</p>;
  }

  if (!result) {
    return <p className="muted small">Din_0: Tell me about one repetitive task.</p>;
  }

  const impactHigh = result.items.some((item) => String(item.impact).toLowerCase() === "high");

  if (mode === "readiness" && /low|beginner/i.test(result.summary + result.firstStep)) {
    return <p className="muted small">Din_0: Start with one focused pilot, not a full rollout.</p>;
  }

  if (impactHigh) {
    return <p className="muted small">Din_0: This is a good candidate for ROI estimation.</p>;
  }

  return <p className="muted small">Din_0: This looks like a strong lead automation opportunity.</p>;
}
