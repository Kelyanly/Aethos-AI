import { useMemo, useState } from "react";
import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";
import OpportunityModeTabs from "../components/opportunity/OpportunityModeTabs.jsx";
import OpportunityForm from "../components/opportunity/OpportunityForm.jsx";
import OpportunityResults from "../components/opportunity/OpportunityResults.jsx";
import OpportunityPresetChips from "../components/opportunity/OpportunityPresetChips.jsx";
import Din0InsightPanel from "../components/opportunity/Din0InsightPanel.jsx";
import Din0Sprite from "../components/Din0Sprite.jsx";
import { generateOpportunity, getModelStatus } from "../lib/browserModelService.js";
import "../styles/opportunity-studio.css";

const defaultForms = {
  use_cases: {
    industry: "agency",
    companySize: "12",
    repetitiveTask: "",
    customerChallenge: "",
  },
  workflow: {
    manualWorkflow: "",
    slowdown: "",
    stakeholders: "",
  },
  roadmap: {
    industry: "service",
    businessPriority: "",
    processIssue: "",
  },
  readiness: {
    companySize: "15",
    monthlyLeadVolume: "120",
    supportVolume: "200",
    processMaturity: "medium",
  },
};

export default function AiOpportunityStudio() {
  const [mode, setMode] = useState("use_cases");
  const [forms, setForms] = useState(defaultForms);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const modelStatus = useMemo(() => getModelStatus(), []);

  function onModeChange(nextMode) {
    setMode(nextMode);
    setResult(null);
    setError("");
  }

  function onChange(event) {
    const { name, value } = event.target;
    setForms((prev) => ({
      ...prev,
      [mode]: { ...prev[mode], [name]: value },
    }));
  }

  function applyPreset(values) {
    setForms((prev) => ({
      ...prev,
      use_cases: { ...prev.use_cases, ...values },
    }));
    setMode("use_cases");
  }

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const generation = await generateOpportunity(mode, forms[mode]);
      setResult(generation);
    } catch {
      setError("Generation failed. Please retry.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Seo
        title="AI Opportunity Studio | Aethos AI"
        description="Generate structured AI opportunities and implementation ideas based on your business context directly in your browser."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container op-hero">
          <div>
            <h1>Discover your highest-value AI opportunities</h1>
            <p className="hero-copy muted">
              Generate structured AI use cases and implementation ideas based on your business context — directly in your browser.
            </p>
            <div className="page-intro-block">
              <p>
                This browser-side tool is designed for quick strategic exploration. It produces
                short, structured recommendations you can use in planning and consultation calls.
              </p>
              <ul className="content-list">
                <li>Keep inputs focused on one workflow or business challenge.</li>
                <li>Review outputs as opportunity hypotheses, not fixed commitments.</li>
                <li>Use ROI and booking pages to validate implementation scope.</li>
              </ul>
            </div>
            <div className="op-meta-row">
              <span className="pill-item">Runs locally in your browser</span>
              <span className="pill-item">Inference: {modelStatus.webgpu ? "WebGPU" : "WASM fallback"}</span>
            </div>
          </div>
          <div className="op-din0-card">
            <Din0Sprite inViewport activitySignal={mode.length} chatActive showBubble={false} />
            <Din0InsightPanel mode={mode} result={result} loading={loading} />
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container op-layout">
          <section>
            <OpportunityModeTabs mode={mode} onChange={onModeChange} />
            <OpportunityPresetChips onApply={applyPreset} />
            <OpportunityForm
              mode={mode}
              form={forms[mode]}
              onChange={onChange}
              onSubmit={onSubmit}
              disabled={loading}
            />
          </section>

          <section>
            <OpportunityResults result={result} loading={loading} error={error} />
          </section>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section">
        <div className="container">
          <div className="surface-card">
            <h2>Next step after generation</h2>
            <p className="muted">
              Convert your generated scenario into a measurable pilot by validating assumptions in
              the ROI calculator, then define implementation scope in a consultation.
            </p>
          </div>
        </div>
      </ScrollRevealSection>
    </main>
  );
}
