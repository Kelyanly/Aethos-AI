import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const profiles = [
  {
    label: "Marketing Agency",
    summary: "Automate lead qualification, proposal pre-briefing, and appointment routing.",
  },
  {
    label: "Accounting Firm",
    summary: "Deploy a website assistant to capture tax-service intent and route high-fit prospects.",
  },
  {
    label: "Real Estate",
    summary: "Filter buyer intent early and qualify inquiries before agent calls.",
  },
  {
    label: "Service Business",
    summary: "Use AI workflow automation for repetitive client intake and support requests.",
  },
];

export default function UseCaseSwitcher() {
  const [active, setActive] = useState(profiles[0]);

  return (
    <div className="usecase-switcher">
      <div className="usecase-tabs" role="tablist" aria-label="Industry switcher">
        {profiles.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`chip-button ${active.label === item.label ? "active" : ""}`}
            role="tab"
            aria-selected={active.label === item.label}
            onClick={() => setActive(item)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={active.label}
          className="muted usecase-copy"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.24 }}
        >
          {active.summary}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
