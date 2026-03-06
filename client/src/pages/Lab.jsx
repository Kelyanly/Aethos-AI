import { useState } from "react";
import Seo from "../components/Seo.jsx";
import {
  runLeadQualificationDemo,
  runKnowledgeAssistantDemo,
  runAutomationPotentialDemo,
} from "../lib/api.js";
import Din0PlaygroundGuide from "../components/Din0PlaygroundGuide.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";
import PlaygroundBootSequence from "../components/PlaygroundBootSequence.jsx";
import { trackEvent } from "../lib/analytics.js";

const suggestedInputs = [
  {
    title: "Demo 1 - Lead Qualification (Accounting Firm)",
    prompt:
      "We are a 20-person accounting firm serving SMEs in Belgium and want to automate website lead capture.",
    expected:
      "Detect business type, identify lead qualification need, and suggest AI solutions.",
  },
  {
    title: "Demo 2 - Lead Qualification (Real Estate)",
    prompt:
      "I run a real estate agency and want to qualify website inquiries automatically before scheduling calls.",
    expected: "Suggest lead qualification assistant and lead scoring workflow.",
  },
  {
    title: "Demo 3 - Knowledge Assistant",
    prompt: "How can AI assistants improve lead conversion on business websites?",
    expected:
      "Explain instant response to visitors, lead qualification questions, personalized interactions, and appointment scheduling.",
  },
  {
    title: "Demo 4 - Knowledge Assistant (Internal)",
    prompt: "What is an AI knowledge assistant for internal teams?",
    expected:
      "Explain internal knowledge search for documentation, onboarding, and support.",
  },
];

export default function Lab() {
  const [copiedPrompt, setCopiedPrompt] = useState("");
  const [leadInput, setLeadInput] = useState("");
  const [leadResult, setLeadResult] = useState(null);
  const [leadLoading, setLeadLoading] = useState(false);

  const [ragInput, setRagInput] = useState("");
  const [ragResult, setRagResult] = useState(null);
  const [ragLoading, setRagLoading] = useState(false);

  const [size, setSize] = useState("15");
  const [workload, setWorkload] = useState("35");
  const [autoResult, setAutoResult] = useState(null);
  const [autoLoading, setAutoLoading] = useState(false);

  function useAutomationDemoValues() {
    setSize("15");
    setWorkload("35");
  }

  async function copyPrompt(text) {
    await navigator.clipboard.writeText(text);
    setCopiedPrompt(text);
    setTimeout(() => setCopiedPrompt(""), 1200);
  }

  async function submitLeadDemo(event) {
    event.preventDefault();
    setLeadLoading(true);
    try {
      const result = await runLeadQualificationDemo({ businessDescription: leadInput });
      setLeadResult(result);
      trackEvent("demo_run", "/lab", { demo: "lead_qualification" });
    } finally {
      setLeadLoading(false);
    }
  }

  async function submitRagDemo(event) {
    event.preventDefault();
    setRagLoading(true);
    try {
      const result = await runKnowledgeAssistantDemo({ question: ragInput });
      setRagResult(result);
      trackEvent("demo_run", "/lab", { demo: "knowledge_assistant" });
    } finally {
      setRagLoading(false);
    }
  }

  async function submitAutomationDemo(event) {
    event.preventDefault();
    setAutoLoading(true);
    try {
      const result = await runAutomationPotentialDemo({
        companySize: Number(size),
        weeklyManualHours: Number(workload),
      });
      setAutoResult(result);
      trackEvent("demo_run", "/lab", { demo: "automation_potential" });
    } finally {
      setAutoLoading(false);
    }
  }

  return (
    <main>
      <Seo
        title="AI Playground | Aethos AI"
        description="Interactive demonstrations of AI systems and algorithms used in real consulting projects."
      />

      <PlaygroundBootSequence />

      <ScrollRevealSection className="section booking-intro">
        <div className="container lab-intro-layout">
          <div>
            <h1>AI Playground</h1>
            <p className="hero-copy muted">
              Interactive demonstrations of AI systems and algorithms used in real consulting projects.
            </p>
            <div className="page-intro-block">
              <p>
                Use this page to simulate practical AI consulting for SMEs, including lead
                generation automation, knowledge assistants, and workflow automation scenarios.
              </p>
              <ul className="content-list">
                <li>Run short demos with realistic business prompts.</li>
                <li>Validate expected behavior before discussing implementation.</li>
                <li>Reuse outputs as inputs for ROI estimation and planning.</li>
              </ul>
            </div>
          </div>
          <Din0PlaygroundGuide />
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container lab-grid">
          <article className="surface-card lab-card">
            <h2>1) AI Lead Qualification Bot</h2>
            <p className="muted">
              User describes their business. The system returns a qualification score.
            </p>
            <form onSubmit={submitLeadDemo} className="lab-form">
              <textarea
                rows="4"
                value={leadInput}
                onChange={(event) => setLeadInput(event.target.value)}
                placeholder="Example: We are a 20-person accounting firm serving SMEs in Belgium..."
                required
              />
              <button className="btn btn-primary" disabled={leadLoading}>
                {leadLoading ? "Evaluating..." : "Run Demo"}
              </button>
            </form>
            {leadResult ? (
              <div className="lab-result">
                <p><strong>Qualification score:</strong> {leadResult.score}/100</p>
                <p className="muted">{leadResult.recommendation}</p>
              </div>
            ) : null}
          </article>

          <article className="surface-card lab-card">
            <h2>2) AI Knowledge Assistant Demo</h2>
            <p className="muted">
              User asks a question. The system retrieves answers from a small knowledge base.
            </p>
            <form onSubmit={submitRagDemo} className="lab-form">
              <textarea
                rows="4"
                value={ragInput}
                onChange={(event) => setRagInput(event.target.value)}
                placeholder="Example: How can AI assistants for websites improve lead conversion?"
                required
              />
              <button className="btn btn-primary" disabled={ragLoading}>
                {ragLoading ? "Retrieving..." : "Run Demo"}
              </button>
            </form>
            {ragResult ? (
              <div className="lab-result">
                <p className="muted">{ragResult.answer}</p>
                <p><strong>Source:</strong> {ragResult.source}</p>
              </div>
            ) : null}
          </article>

          <article className="surface-card lab-card">
            <h2>3) Automation Potential Calculator</h2>
            <p className="muted">
              User enters company size and workflow data. System estimates automation potential.
            </p>
            <div className="demo-inline-actions">
              <button type="button" className="btn btn-secondary" onClick={useAutomationDemoValues}>
                Use Demo Values (15 / 35)
              </button>
              <p className="muted small">
                Expected output example: Automation Potential ~41%, Estimated Hours Saved per Month ~56h.
              </p>
            </div>
            <form onSubmit={submitAutomationDemo} className="lab-form two-col">
              <label>
                Company size
                <input
                  type="number"
                  min="1"
                  value={size}
                  onChange={(event) => setSize(event.target.value)}
                  required
                />
              </label>
              <label>
                Weekly manual hours
                <input
                  type="number"
                  min="1"
                  value={workload}
                  onChange={(event) => setWorkload(event.target.value)}
                  required
                />
              </label>
              <button className="btn btn-primary full-row" disabled={autoLoading}>
                {autoLoading ? "Calculating..." : "Run Demo"}
              </button>
            </form>
            {autoResult ? (
              <div className="lab-result">
                <p><strong>Estimated automation potential:</strong> {autoResult.automationPotential}%</p>
                <p><strong>Estimated hours saved per month:</strong> {autoResult.hoursSavedPerMonth}</p>
                <p className="muted">{autoResult.summary}</p>
              </div>
            ) : null}
          </article>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section">
        <div className="container">
          <h2>Suggested Demo Inputs</h2>
          <div className="page-intro-block">
            <p>
              These prompts help prospects understand how AI assistants for websites and internal
              teams can behave in common business situations.
            </p>
          </div>
          <div className="cards-grid">
            {suggestedInputs.map((item) => (
              <article key={item.title} className="surface-card">
                <h3>{item.title}</h3>
                <div className="prompt-row">
                  <p><strong>Example input:</strong> {item.prompt}</p>
                  <button
                    type="button"
                    className="btn btn-secondary prompt-copy-btn"
                    onClick={() => copyPrompt(item.prompt)}
                  >
                    {copiedPrompt === item.prompt ? "Copied" : "Copy Prompt"}
                  </button>
                </div>
                <p className="muted"><strong>Expected system behavior:</strong> {item.expected}</p>
              </article>
            ))}
          </div>
        </div>
      </ScrollRevealSection>
    </main>
  );
}
