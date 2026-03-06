import { useMemo, useState } from "react";

export default function ROISlider() {
  const [employees, setEmployees] = useState(20);
  const [leads, setLeads] = useState(120);
  const [tickets, setTickets] = useState(220);

  const estimate = useMemo(() => {
    const automationPotential = Math.min(65, Math.round(18 + employees * 0.35 + leads * 0.04 + tickets * 0.03));
    const hoursSaved = Math.round((leads * 0.12 + tickets * 0.17) * (automationPotential / 100));
    const annualValue = Math.round(hoursSaved * 42 * 12);

    return { automationPotential, hoursSaved, annualValue };
  }, [employees, leads, tickets]);

  return (
    <article className="surface-card interactive-card roi-slider-box">
      <h3>Live ROI Preview</h3>
      <p className="muted">Adjust key inputs to see an indicative automation opportunity range.</p>
      <div className="range-grid">
        <label>
          Number of employees: {employees}
          <input type="range" min="5" max="120" value={employees} onChange={(e) => setEmployees(Number(e.target.value))} />
        </label>
        <label>
          Monthly leads: {leads}
          <input type="range" min="20" max="600" step="10" value={leads} onChange={(e) => setLeads(Number(e.target.value))} />
        </label>
        <label>
          Monthly support tickets: {tickets}
          <input type="range" min="30" max="900" step="10" value={tickets} onChange={(e) => setTickets(Number(e.target.value))} />
        </label>
      </div>
      <div className="lab-result" role="status" aria-live="polite">
        <p><strong>Automation potential:</strong> {estimate.automationPotential}%</p>
        <p><strong>Estimated hours saved:</strong> {estimate.hoursSaved} / month</p>
        <p><strong>Estimated annual value:</strong> EUR {estimate.annualValue.toLocaleString()}</p>
      </div>
    </article>
  );
}
