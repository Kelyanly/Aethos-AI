import { useState } from "react";
import WidgetCard from "./WidgetCard.jsx";
import { promptExamples } from "./data.js";

export default function PromptLibraryMini() {
  const [copied, setCopied] = useState("");

  async function handleCopy(prompt) {
    await navigator.clipboard.writeText(prompt);
    setCopied(prompt);
    window.setTimeout(() => setCopied(""), 1200);
  }

  return (
    <WidgetCard title="Prompt Library Mini" subtitle="Discovery" badge="Copy ready" icon="⎘">
      <div className="widget-list-stack">
        {promptExamples.slice(0, 3).map((prompt) => (
          <div key={prompt} className="widget-copy-row">
            <span>{prompt}</span>
            <button type="button" className="chip-button" onClick={() => handleCopy(prompt)}>{copied === prompt ? 'Copied' : 'Copy'}</button>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
