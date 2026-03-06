import ScrollRevealSection from "../ScrollRevealSection.jsx";
import SectionHeader from "../SectionHeader.jsx";

const rows = [
  { industry: "Real estate", potential: "40-50%", value: "EUR 50k+/year" },
  { industry: "Accounting", potential: "35-45%", value: "EUR 40k+/year" },
  { industry: "Agencies", potential: "45-55%", value: "EUR 60k+/year" },
];

export default function ROIExamples() {
  return (
    <ScrollRevealSection className="section" id="roi-examples">
      <div className="container">
        <SectionHeader
          eyebrow="Typical AI ROI"
          title="Reference ROI ranges by business profile"
          description="These benchmark ranges help teams estimate where AI lead generation automation and workflow improvements can create value first."
        />
        <div className="surface-card">
          <div className="table-wrap" role="region" aria-label="Typical AI ROI table">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Industry</th>
                  <th scope="col">Automation Potential</th>
                  <th scope="col">Estimated Value</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.industry}>
                    <th scope="row">{row.industry}</th>
                    <td>{row.potential}</td>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ScrollRevealSection>
  );
}
