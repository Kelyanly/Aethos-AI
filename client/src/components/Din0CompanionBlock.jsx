import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Din0Sprite from "./Din0Sprite.jsx";
import { companyTypeOptions, companyTypeToRecommendation, rotatingPrompts } from "../agents/din0Agent.js";
import { generateUseCases } from "../agents/useCaseGenerator.js";
import { summarizeAutomationPotential } from "../agents/roiAssistant.js";

export default function Din0CompanionBlock({
  inViewport,
  ctaHovered,
  ctaClickSignal,
  chatActive,
  activitySignal,
}) {
  const [companyType, setCompanyType] = useState("");
  const [businessInput, setBusinessInput] = useState("");
  const [taskInput, setTaskInput] = useState("");

  const useCaseResult = useMemo(() => generateUseCases(businessInput), [businessInput]);
  const automationResult = useMemo(
    () => summarizeAutomationPotential(taskInput),
    [taskInput],
  );

  const recommendation = companyType ? companyTypeToRecommendation(companyType) : "";

  return (
    <div className="din0-companion-block">
      <Din0Sprite
        inViewport={inViewport}
        ctaHovered={ctaHovered}
        ctaClickSignal={ctaClickSignal}
        chatActive={chatActive}
        activitySignal={activitySignal}
      />

      <div className="din0-guide-actions">
        <p className="muted small">Din_0 Guide</p>
        <p className="din0-guide-rotating">{rotatingPrompts[(activitySignal || 0) % rotatingPrompts.length]}</p>

        <div className="din0-action-links">
          <Link className="btn btn-secondary" to="/lab">Try a Demo</Link>
          <Link className="btn btn-secondary" to="/use-cases">See AI Use Cases</Link>
          <Link className="btn btn-secondary" to="/ai-roi-calculator">Calculate ROI</Link>
          <Link className="btn btn-primary" to="/book">Book Consultation</Link>
        </div>

        <div className="din0-microtool">
          <p className="small muted">What best describes your company?</p>
          <div className="usecase-tabs">
            {companyTypeOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                className={`chip-button ${companyType === option.key ? "active" : ""}`}
                onClick={() => setCompanyType(option.key)}
              >
                {option.label}
              </button>
            ))}
          </div>
          {recommendation ? <p className="muted small">{recommendation}</p> : null}
        </div>

        <div className="din0-microtool">
          <label>
            <span className="small muted">AI Use Case Generator</span>
            <input
              value={businessInput}
              onChange={(event) => setBusinessInput(event.target.value)}
              placeholder="We are a marketing agency..."
            />
          </label>
          {businessInput.trim() ? (
            <ul className="din0-list small muted">
              {useCaseResult.systems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="din0-microtool">
          <label>
            <span className="small muted">Describe one repetitive task</span>
            <input
              value={taskInput}
              onChange={(event) => setTaskInput(event.target.value)}
              placeholder="Manual follow-up emails after web leads"
            />
          </label>
          {taskInput.trim() ? (
            <p className="small muted">
              Automation potential: <strong>{automationResult.automationPotential}%</strong>. {automationResult.recommendation}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
