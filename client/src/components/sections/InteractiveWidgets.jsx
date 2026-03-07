import { useMemo, useState } from "react";
import SectionHeader from "../SectionHeader.jsx";
import ScrollRevealSection from "../ScrollRevealSection.jsx";
import OpportunityHeatmap from "../widgets/OpportunityHeatmap.jsx";
import ROITicker from "../widgets/ROITicker.jsx";
import Din0CommandCenter from "../widgets/Din0CommandCenter.jsx";
import WorkflowBottleneckFinder from "../widgets/WorkflowBottleneckFinder.jsx";
import AgentBuilderPreview from "../widgets/AgentBuilderPreview.jsx";
import LiveDemoLauncher from "../widgets/LiveDemoLauncher.jsx";
import TrustSignalsCarousel from "../widgets/TrustSignalsCarousel.jsx";
import CaseStudySnapshot from "../widgets/CaseStudySnapshot.jsx";
import IndustrySwitchboard from "../widgets/IndustrySwitchboard.jsx";
import StackExplorer from "../widgets/StackExplorer.jsx";
import IntegrationCloud from "../widgets/IntegrationCloud.jsx";
import PrivacyBox from "../widgets/PrivacyBox.jsx";
import KnowledgeCoverageMeter from "../widgets/KnowledgeCoverageMeter.jsx";
import PromptLibraryMini from "../widgets/PromptLibraryMini.jsx";
import QualitySimulator from "../widgets/QualitySimulator.jsx";
import LeadScorecard from "../widgets/LeadScorecard.jsx";
import AutomationMiniCalc from "../widgets/AutomationMiniCalc.jsx";
import RoadmapTimeline from "../widgets/RoadmapTimeline.jsx";
import Din0Status from "../widgets/Din0Status.jsx";
import RiveMicroIllustrations from "../widgets/RiveMicroIllustrations.jsx";
import { widgetCategories, widgetMeta } from "../widgets/data.js";

const widgetRegistry = {
  "opportunity-heatmap": OpportunityHeatmap,
  "roi-ticker": ROITicker,
  "din0-command-center": Din0CommandCenter,
  "workflow-bottleneck-finder": WorkflowBottleneckFinder,
  "agent-builder-preview": AgentBuilderPreview,
  "live-demo-launcher": LiveDemoLauncher,
  "trust-signals-carousel": TrustSignalsCarousel,
  "case-study-snapshot": CaseStudySnapshot,
  "industry-switchboard": IndustrySwitchboard,
  "stack-explorer": StackExplorer,
  "integration-cloud": IntegrationCloud,
  "privacy-box": PrivacyBox,
  "knowledge-coverage-meter": KnowledgeCoverageMeter,
  "prompt-library-mini": PromptLibraryMini,
  "quality-simulator": QualitySimulator,
  "lead-scorecard": LeadScorecard,
  "automation-mini-calc": AutomationMiniCalc,
  "roadmap-timeline": RoadmapTimeline,
  "din0-status": Din0Status,
  "rive-micro-illustrations": RiveMicroIllustrations,
};

export default function InteractiveWidgets() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return widgetMeta.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const searchMatch = item.title.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  return (
    <ScrollRevealSection className="section section-alt" id="interactive-widgets">
      <div className="container">
        <SectionHeader
          eyebrow="Interactive Widgets"
          title="A product-style layer for discovery, trust, and conversion"
          description="These widgets turn the website into a more interactive AI platform experience. They are intentionally compact, fast to scan, and designed to route visitors toward demos, ROI, or booking."
        />

        <div className="widget-toolbar">
          <div className="widget-chip-wrap">
            {widgetCategories.map((item) => (
              <button key={item} type="button" className={`chip-button ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
          <label className="widget-search">
            <span className="sr-only">Search widgets</span>
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search widgets" />
          </label>
        </div>

        <div className="widgets-grid">
          {filtered.map((item) => {
            const Component = widgetRegistry[item.key];
            return <Component key={item.key} />;
          })}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
