import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import WidgetCard from "./WidgetCard.jsx";

const data = [
  { name: "Covered", value: 78, color: "#1f6b4f" },
  { name: "Gap", value: 22, color: "rgba(15, 23, 32, 0.1)" },
];

export default function KnowledgeCoverageMeter() {
  return (
    <WidgetCard title="Knowledge Coverage Meter" subtitle="Architecture" badge="78%" icon="◔">
      <div className="widget-chart-shell widget-chart-shell-small">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={48} outerRadius={68} stroke="none">
              {data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="small muted">Good fit for a first internal knowledge assistant pilot.</p>
    </WidgetCard>
  );
}
