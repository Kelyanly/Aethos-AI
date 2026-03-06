import { useState } from "react";
import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";

const categories = {
  Sales: [
    {
      title: "Lead Qualification Prompt",
      text:
        "You are a sales assistant. Analyze this lead conversation and return: interest level, estimated budget, buying timeline, qualification score (0-100), and CRM-ready summary.",
    },
    {
      title: "Discovery Call Prep",
      text:
        "Summarize this prospect profile and generate five discovery questions focused on operational pain points and decision criteria.",
    },
    {
      title: "Follow-up Sequence",
      text:
        "Create a 3-step follow-up sequence for this lead with clear objective, message angle, and call-to-action for each step.",
    },
    {
      title: "Pipeline Risk Scan",
      text:
        "Review these opportunities and flag deals at risk based on inactivity, unclear timeline, or missing decision-maker signals.",
    },
  ],
  Marketing: [
    {
      title: "Content Angle Generator",
      text:
        "Generate three content angles for this service offer, each with target audience, key pain point, and business outcome.",
    },
    {
      title: "Campaign Brief Assistant",
      text:
        "Convert this campaign idea into a structured brief: objective, audience, value proposition, channels, KPI, and timeline.",
    },
    {
      title: "Landing Page Message Audit",
      text:
        "Analyze this landing page copy and suggest improvements for clarity, trust, and conversion intent.",
    },
    {
      title: "Email Personalization",
      text:
        "Rewrite this outreach email for a specific industry profile and keep tone concise, professional, and outcome-focused.",
    },
  ],
  Operations: [
    {
      title: "Workflow Bottleneck Detector",
      text:
        "Review this workflow description and identify bottlenecks, repetitive steps, and AI automation opportunities.",
    },
    {
      title: "SOP Simplifier",
      text:
        "Rewrite this SOP into a shorter version with clear action steps, owner, and escalation criteria.",
    },
    {
      title: "Meeting Summary to Action Plan",
      text:
        "Summarize these meeting notes and extract decisions, owners, deadlines, and unresolved questions.",
    },
    {
      title: "Process Handoff Template",
      text:
        "Generate a handoff template for this process including required fields, quality checks, and next-step trigger.",
    },
  ],
  "Customer Support": [
    {
      title: "First Response Draft",
      text:
        "Draft a concise first support response with empathy, issue summary, next step, and expected timeline.",
    },
    {
      title: "Ticket Triage Prompt",
      text:
        "Classify this support ticket by severity, urgency, and category, then suggest escalation path if needed.",
    },
    {
      title: "Knowledge Gap Finder",
      text:
        "Analyze recent tickets and list the top missing knowledge base articles that would reduce repetitive requests.",
    },
    {
      title: "Resolution Summary",
      text:
        "Create a short resolution summary suitable for CRM notes and customer follow-up documentation.",
    },
  ],
  Research: [
    {
      title: "Use Case Research Brief",
      text:
        "Generate a research brief for this AI use case including scope, stakeholders, constraints, and expected impact.",
    },
    {
      title: "Competitive Signal Summary",
      text:
        "Summarize how similar businesses apply AI assistants and highlight patterns relevant to this company profile.",
    },
    {
      title: "Decision Memo Draft",
      text:
        "Draft a short decision memo comparing two AI implementation options with benefits, risks, and recommendation.",
    },
    {
      title: "Experiment Plan",
      text:
        "Design a 30-day AI pilot plan with hypothesis, metrics, test users, and evaluation checkpoints.",
    },
  ],
};

export default function PromptLibrary() {
  const [copied, setCopied] = useState("");

  async function copyPrompt(prompt) {
    await navigator.clipboard.writeText(prompt);
    setCopied(prompt);
    setTimeout(() => setCopied(""), 1000);
  }

  return (
    <main>
      <Seo
        title="AI Prompt Library | Aethos AI"
        description="Copy ready-to-use prompts for sales automation, lead qualification, support automation, operations, and research workflows."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>AI Prompt Library</h1>
          <p className="hero-copy muted">Reusable prompt templates for practical AI operations.</p>
          <div className="page-intro-block">
            <p>
              Use these prompts as starting blocks for AI assistants, internal copilots, and
              workflow automation experiments. Keep outputs structured and business-focused.
            </p>
            <ul className="content-list">
              <li>Start with one process and one measurable KPI.</li>
              <li>Use prompt outputs in CRM, support, or reporting workflows.</li>
              <li>Refine wording after reviewing result quality with your team.</li>
            </ul>
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container">
          {Object.entries(categories).map(([category, prompts]) => (
            <div key={category} className="prompt-library-group">
              <h2>{category}</h2>
              <div className="cards-grid compact-grid">
                {prompts.map((prompt) => (
                  <article key={prompt.title} className="surface-card compact interactive-card">
                    <h3>{prompt.title}</h3>
                    <p className="muted">{prompt.text}</p>
                    <button type="button" className="btn btn-secondary" onClick={() => copyPrompt(prompt.text)}>
                      {copied === prompt.text ? "Copied" : "Copy Prompt"}
                    </button>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollRevealSection>
    </main>
  );
}
