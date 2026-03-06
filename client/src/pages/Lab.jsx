import { useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import {
  runLeadQualificationDemo,
  runMiniRagDemo,
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
      const result = await runMiniRagDemo({ question: ragInput });
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
      <section className="section booking-intro">
        <div className="container">
          <SectionHeader
            eyebrow="AI Playground"
            title="Interactive demonstrations of AI systems used in real consulting projects"
            description="Test lightweight demos for AI lead generation automation, mini retrieval workflows, and operational automation potential."
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container lab-grid">
          <article className="surface-card lab-card">
            <h3>1) AI Lead Qualification Bot</h3>
            <p className="muted">
              Describe your business. The demo returns a qualification score and recommendation.
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
                {leadLoading ? "Evaluating..." : "Evaluate Lead Potential"}
              </button>
            </form>
            {leadResult ? (
              <div className="lab-result">
                <p><strong>Score:</strong> {leadResult.score}/100</p>
                <p className="muted">{leadResult.recommendation}</p>
              </div>
            ) : null}
          </article>

          <article className="surface-card lab-card">
            <h3>2) Mini RAG Demo</h3>
            <p className="muted">
              Ask a question. The demo retrieves an answer from a local consulting knowledge base.
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
                {ragLoading ? "Searching..." : "Retrieve Answer"}
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
            <h3>3) AI Automation Potential Calculator</h3>
            <p className="muted">
              Enter team size and manual workload. The demo estimates automation potential.
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
                {autoLoading ? "Calculating..." : "Estimate Potential"}
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
