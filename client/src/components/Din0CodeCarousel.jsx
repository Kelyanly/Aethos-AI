const CODE_SNIPPETS = [
  "agent.qualifyLead({ industry: 'real-estate', intent: 'high' })",
  "rag.search('pricing objection workflow').topK(4)",
  "automation.route({ trigger: 'new_lead', next: 'crm_sync' })",
  "din0.explain('roi-calculator').suggest('/book')",
  "knowledge.answer({ source: 'internal_docs', confidence: 0.92 })",
];

export default function Din0CodeCarousel() {
  const items = [...CODE_SNIPPETS, ...CODE_SNIPPETS];

  return (
    <div className="din0-code-carousel" aria-hidden="true">
      <div className="din0-code-carousel-track">
        {items.map((snippet, index) => (
          <span key={`${snippet}-${index}`} className="din0-code-pill">
            <span className="din0-code-dot" />
            <code>{snippet}</code>
          </span>
        ))}
      </div>
    </div>
  );
}
