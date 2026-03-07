import WidgetCard from "./WidgetCard.jsx";

export default function PrivacyBox() {
  return (
    <WidgetCard title="Data Privacy Box" subtitle="Trust" badge="EU ready" icon="▢">
      <ul className="content-list compact">
        <li>Browser-side generation for lightweight strategic exploration.</li>
        <li>Local or EU-hosted backend options for sensitive workflows.</li>
        <li>Scoped assistants with bounded prompts and controllable routing.</li>
      </ul>
    </WidgetCard>
  );
}
