import WidgetCard from "./WidgetCard.jsx";

function Glyph({ type }) {
  if (type === 'scan') {
    return <svg viewBox="0 0 64 64" className="widget-rive-glyph" aria-hidden="true"><rect x="10" y="12" width="44" height="40" rx="10" /><path d="M16 30h32" /><path d="M22 22h20" /><path d="M22 38h12" /></svg>;
  }
  if (type === 'spark') {
    return <svg viewBox="0 0 64 64" className="widget-rive-glyph" aria-hidden="true"><path d="M32 10l4 14 14 4-14 4-4 14-4-14-14-4 14-4z" /></svg>;
  }
  return <svg viewBox="0 0 64 64" className="widget-rive-glyph" aria-hidden="true"><circle cx="32" cy="32" r="18" /><path d="M24 32h16" /></svg>;
}

export default function RiveMicroIllustrations() {
  return (
    <WidgetCard title="Rive Micro Illustrations" subtitle="Din_0" badge="Stub" icon="✦">
      <p className="muted">Static placeholders are used for now. Replace them with `.riv` assets when final motion files are available.</p>
      <div className="widget-rive-row">
        <Glyph type="spark" />
        <Glyph type="scan" />
        <Glyph type="ok" />
      </div>
    </WidgetCard>
  );
}
