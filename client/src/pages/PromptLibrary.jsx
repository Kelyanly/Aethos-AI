import { useState } from "react";
import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";

const categories = {
  "Sales Automation": [
    "Qualify this inbound lead based on intent, budget, and timeline.",
    "Summarize this lead conversation and output a CRM-ready brief.",
  ],
  "Lead Qualification": [
    "Ask five questions to qualify this website visitor for a consultation call.",
    "Score this lead from 0-100 and explain why.",
  ],
  "Support Automation": [
    "Draft a concise first response for this customer support request.",
    "Classify this ticket and suggest escalation if needed.",
  ],
  "Internal Knowledge": [
    "Answer this question only using company SOP and policy docs.",
    "Summarize onboarding steps for a new team member in this department.",
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
        description="Copy ready-to-use prompts for sales automation, lead qualification, support automation, and internal knowledge assistants."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>AI Prompt Library</h1>
          <p className="hero-copy muted">Reusable prompt templates for practical AI operations.</p>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container">
          {Object.entries(categories).map(([category, prompts]) => (
            <div key={category} className="prompt-library-group">
              <h2>{category}</h2>
              <div className="cards-grid compact-grid">
                {prompts.map((prompt) => (
                  <article key={prompt} className="surface-card compact interactive-card">
                    <p>{prompt}</p>
                    <button type="button" className="btn btn-secondary" onClick={() => copyPrompt(prompt)}>
                      {copied === prompt ? "Copied" : "Copy Prompt"}
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
