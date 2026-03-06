import { useMemo, useState } from "react";

export default function WorkflowComparison() {
  const [aiLevel, setAiLevel] = useState(45);

  const comparison = useMemo(() => {
    const withoutAi = 100;
    const withAi = Math.max(35, 100 - aiLevel);
    return { withoutAi, withAi };
  }, [aiLevel]);

  return (
    <article className="surface-card interactive-card workflow-compare-box">
      <h3>Workflow Visualizer</h3>
      <p className="muted">
        Compare manual workflow pressure against AI-assisted workflow execution.
      </p>

      <label className="full-row">
        Without AI &larr; &rarr; With AI: {aiLevel}% assistance
        <input type="range" min="10" max="80" value={aiLevel} onChange={(event) => setAiLevel(Number(event.target.value))} />
      </label>

      <div className="workflow-compare-bars" aria-hidden="true">
        <div>
          <p>Without AI</p>
          <span style={{ width: `${comparison.withoutAi}%` }} />
        </div>
        <div>
          <p>With AI</p>
          <span style={{ width: `${comparison.withAi}%` }} />
        </div>
      </div>

      <p className="muted small">
        As AI support increases, manual handling effort decreases and response quality becomes more consistent.
      </p>
    </article>
  );
}
