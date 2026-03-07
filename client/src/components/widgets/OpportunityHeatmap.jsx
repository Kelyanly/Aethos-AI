import { Scatter, ScatterChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import WidgetCard from "./WidgetCard.jsx";
import { heatmapPoints } from "./data.js";

export default function OpportunityHeatmap() {
  return (
    <WidgetCard title="AI Opportunity Heatmap" subtitle="Discovery" badge="Impact × effort" icon="◎">
      <p className="muted">Scan six practical automations and identify the fastest high-impact pilot.</p>
      <div className="widget-chart-shell">
        <ResponsiveContainer width="100%" height={180}>
          <ScatterChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <XAxis type="number" dataKey="effort" name="Effort" domain={[0, 5]} tickCount={6} />
            <YAxis type="number" dataKey="impact" name="Impact" domain={[0, 5]} tickCount={6} />
            <ZAxis type="number" dataKey="automation" range={[110, 640]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(value, name) => [`${value}${name === 'automation' ? '%' : ''}`, name]} />
            <Scatter data={heatmapPoints} fill="#1f6b4f" fillOpacity={0.82} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
