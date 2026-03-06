import { motion } from "framer-motion";
import AnimatedStat from "./AnimatedStat.jsx";

export default function ROIResultVisualizer({ result }) {
  if (!result) {
    return <p className="muted">Complete the form to generate your AI ROI estimate.</p>;
  }

  const hoursPercent = Math.min(100, Math.round((result.hoursSavedPerMonth / 200) * 100));
  const automationPercent = Math.min(100, result.automationPotential);

  return (
    <div className="roi-visualizer">
      <div className="lab-result">
        <p><strong>Estimated hours saved per month:</strong> <AnimatedStat value={result.hoursSavedPerMonth} /></p>
        <p><strong>Estimated automation potential:</strong> <AnimatedStat value={result.automationPotential} suffix="%" /></p>
        <p><strong>Estimated monthly savings:</strong> EUR <AnimatedStat value={result.estimatedMonthlySavings} /></p>
        <p><strong>Estimated annual savings:</strong> EUR <AnimatedStat value={result.estimatedAnnualSavings} /></p>
        <p><strong>Estimated annual ROI:</strong> <AnimatedStat value={result.estimatedAnnualRoi} suffix="%" /></p>
      </div>

      <div className="roi-bars" aria-hidden="true">
        <p className="muted small">Input → Automation → ROI outcome</p>
        <div className="roi-bar-row">
          <span>Hours</span>
          <div className="roi-bar-track">
            <motion.span
              className="roi-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${hoursPercent}%` }}
              transition={{ duration: 0.55 }}
            />
          </div>
        </div>
        <div className="roi-bar-row">
          <span>Automation</span>
          <div className="roi-bar-track">
            <motion.span
              className="roi-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${automationPercent}%` }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
