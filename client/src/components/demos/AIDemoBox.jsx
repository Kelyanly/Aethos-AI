import { useState } from "react";

const demos = {
  assistant: {
    label: "Try an AI assistant",
    output: "AI assistant can greet visitors, collect intent signals, and route qualified leads to your team in seconds.",
  },
  qualification: {
    label: "Try lead qualification",
    output: "Qualification flow asks intent, budget, and timeline to prioritize high-fit leads for faster follow-up.",
  },
  knowledge: {
    label: "Try knowledge search",
    output: "Knowledge assistant retrieves relevant SOP and policy guidance so teams answer faster and more consistently.",
  },
};

export default function AIDemoBox() {
  const [active, setActive] = useState("assistant");

  return (
    <article className="surface-card interactive-card ai-demo-box">
      <h3>Interactive AI Demo</h3>
      <p className="muted">
        Test a short simulation of how AI assistants for websites and internal teams can support
        operations.
      </p>
      <div className="demo-inline-actions">
        {Object.entries(demos).map(([key, item]) => (
          <button
            key={key}
            type="button"
            className={`btn ${active === key ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setActive(key)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="lab-result" role="status" aria-live="polite">
        <p className="muted">{demos[active].output}</p>
      </div>
    </article>
  );
}
