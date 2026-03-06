import { useState } from "react";
import Seo from "../components/Seo.jsx";
import {
  runLeadQualificationDemo,
  runKnowledgeAssistantDemo,
  runAutomationPotentialDemo,
} from "../lib/api.js";

export default function Lab() {
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

  async function submitLeadDemo(event) {
    event.preventDefault();
    setLeadLoading(true);
    try {
      const result = await runLeadQualificationDemo({ businessDescription: leadInput });
      setLeadResult(result);
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

      <section className="section booking-intro">
        <div className="container">
          <h1>AI Playground</h1>
          <p className="hero-copy muted">
            Interactive demonstrations of AI systems and algorithms used in real consulting projects.
          </p>
        </div>
      </section>

      <section className="section section-alt">
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
                <p><strong>Estimated weekly hours saved:</strong> {autoResult.hoursSaved}</p>
                <p className="muted">{autoResult.summary}</p>
              </div>
            ) : null}
          </article>
        </div>
      </section>
    </main>
  );
}
