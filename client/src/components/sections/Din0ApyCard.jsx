import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const financeMetrics = [
  { label: "FDIC avg savings", value: "0.39% APY", badge: "benchmark" },
  { label: "Best HYSA", value: "~5.00% APY", badge: "benchmark" },
  { label: "3-mo T-bill", value: "~3.7%", badge: "benchmark" },
];

const productivityByIntent = {
  agency: [
    { label: "Automation potential", value: "+42%" },
    { label: "Proposal prep saved", value: "≈12h/mo" },
    { label: "Response speed", value: "+30%" },
  ],
  "real-estate": [
    { label: "Automation potential", value: "+46%" },
    { label: "Lead qualification saved", value: "≈18h/mo" },
    { label: "Response speed", value: "+34%" },
  ],
  accounting: [
    { label: "Automation potential", value: "+39%" },
    { label: "Client Q&A saved", value: "≈14h/mo" },
    { label: "Response speed", value: "+26%" },
  ],
  unknown: [
    { label: "Automation potential", value: "+42%" },
    { label: "Time reclaimed", value: "≈56h/mo" },
    { label: "Response speed", value: "+30%" },
  ],
};

export default function Din0ApyCard({ defaultMode = "productivity", intent = "unknown" }) {
  const [mode, setMode] = useState(defaultMode);
  const reduceMotion = useReducedMotion();

  const productivityMetrics = useMemo(
    () => productivityByIntent[intent] || productivityByIntent.unknown,
    [intent],
  );

  const metrics = mode === "finance" ? financeMetrics : productivityMetrics;

  return (
    <aside className="hero-panel apy-card" aria-label="Din_0 APY">
      <div className="apy-card-header">
        <div>
          <p className="panel-kicker">Din_0 APY</p>
          <p className="apy-card-subtitle muted">Annual Productivity Yield</p>
        </div>
        <div className="apy-toggle" role="tablist" aria-label="APY mode">
          <button
            type="button"
            className={`apy-toggle-pill ${mode === "productivity" ? "active" : ""}`}
            onClick={() => setMode("productivity")}
            aria-selected={mode === "productivity"}
          >
            Productivity
          </button>
          <button
            type="button"
            className={`apy-toggle-pill ${mode === "finance" ? "active" : ""}`}
            onClick={() => setMode("finance")}
            aria-selected={mode === "finance"}
          >
            Finance
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${mode}-${intent}`}
          className="apy-metric-list"
          initial={reduceMotion ? false : { opacity: 0, y: 4 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {metrics.map((metric) => (
            <div key={`${mode}-${metric.label}`} className="apy-metric-row">
              <div className="apy-metric-label">
                <span>{metric.label}</span>
                {metric.badge ? <em>{metric.badge}</em> : null}
              </div>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <p className="apy-card-note muted">APY here is about time & throughput — not interest.</p>
    </aside>
  );
}
