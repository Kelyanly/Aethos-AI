const presets = [
  {
    label: "Accounting firm with repetitive client questions",
    values: {
      industry: "accounting",
      companySize: "18",
      repetitiveTask: "Responding to repeated client tax and compliance questions",
      customerChallenge: "Slow response time for inbound advisory requests",
    },
  },
  {
    label: "Real estate agency filtering buyer leads",
    values: {
      industry: "real_estate",
      companySize: "12",
      repetitiveTask: "Manually qualifying buyer inquiries from website forms",
      customerChallenge: "Agents spend time on low-intent leads",
    },
  },
  {
    label: "Agency handling repetitive service inquiries",
    values: {
      industry: "agency",
      companySize: "25",
      repetitiveTask: "Sorting inbound service requests and routing to sales",
      customerChallenge: "Follow-up delay reduces conversion",
    },
  },
  {
    label: "SME team losing time on internal knowledge requests",
    values: {
      industry: "service",
      companySize: "30",
      repetitiveTask: "Answering internal process and SOP questions repeatedly",
      customerChallenge: "Internal teams lose productivity finding reliable answers",
    },
  },
];

export default function OpportunityPresetChips({ onApply }) {
  return (
    <div className="op-presets">
      {presets.map((preset) => (
        <button key={preset.label} type="button" className="chip-button" onClick={() => onApply(preset.values)}>
          {preset.label}
        </button>
      ))}
    </div>
  );
}
