const labels = {
  use_cases: "Use Case Generator",
  workflow: "Workflow Analyzer",
  roadmap: "AI Roadmap Builder",
  readiness: "Readiness Snapshot",
};

export default function OpportunityModeTabs({ mode, onChange }) {
  return (
    <div className="op-mode-tabs-wrap">
      <p className="muted small">Select a mode based on your business planning need:</p>
      <div className="op-mode-tabs" role="tablist" aria-label="Opportunity modes">
        {Object.entries(labels).map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={mode === key}
            className={`chip-button ${mode === key ? "active" : ""}`}
            onClick={() => onChange(key)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
