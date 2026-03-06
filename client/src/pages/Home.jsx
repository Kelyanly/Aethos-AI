import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";
import Seo from "../components/Seo.jsx";
import AnimatedStat from "../components/AnimatedStat.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";
import AISignalBackground from "../components/AISignalBackground.jsx";
import UseCaseSwitcher from "../components/UseCaseSwitcher.jsx";
import WorkflowMicroDiagram from "../components/WorkflowMicroDiagram.jsx";
import Din0StickyAssistant from "../components/Din0StickyAssistant.jsx";
import Din0Companion from "../components/Din0Companion.jsx";
import WhyAdoptAI from "../components/sections/WhyAdoptAI.jsx";
import ROIExamples from "../components/sections/ROIExamples.jsx";
import HowWeWork from "../components/sections/HowWeWork.jsx";
import FAQ from "../components/sections/FAQ.jsx";
import SocialProof from "../components/sections/SocialProof.jsx";
import AIDemoBox from "../components/demos/AIDemoBox.jsx";
import ROISlider from "../components/tools/ROISlider.jsx";
import WorkflowComparison from "../components/visualizers/WorkflowComparison.jsx";
import { tourSteps } from "../agents/demoGuide.js";
import { trackEvent } from "../lib/analytics.js";

const aiSystems = [
  {
    title: "AI Lead Generation Systems",
    copy: "AI assistants that qualify website visitors and capture leads automatically.",
  },
  {
    title: "AI Knowledge Assistants",
    copy: "Internal AI search assistants connected to company knowledge bases.",
  },
  {
    title: "AI Workflow Automation",
    copy: "Automation of repetitive processes across operations.",
  },
  {
    title: "AI Readiness Audit",
    copy: "Assessment of company processes to identify AI opportunities.",
  },
  {
    title: "AI Strategy & Roadmap",
    copy: "Structured plan for AI adoption aligned with business goals.",
  },
];

const chatHiveAgents = [
  "Lead qualification assistant",
  "Customer support AI agent",
  "Internal knowledge assistant",
  "Appointment scheduling assistant",
];

const implementations = [
  {
    title: "Lead capture assistant for service businesses",
    outcome: "More qualified leads and faster response timing.",
  },
  {
    title: "Internal knowledge assistant for teams",
    outcome: "Reduced response time and better consistency.",
  },
  {
    title: "Customer support automation AI",
    outcome: "Less repetitive work and stronger support coverage.",
  },
];

const credibilityLinks = [
  {
    title: "AI Systems Architecture",
    copy: "Review the reference stack: website assistant, workflow automation, CRM and knowledge connections.",
    href: "/architecture",
  },
  {
    title: "AI Implementation Roadmap",
    copy: "Discovery, prototype, pilot, deployment, and optimization timeline.",
    href: "/implementation-roadmap",
  },
  {
    title: "Industry Playbooks",
    copy: "Real estate, accounting, and agency-focused use cases and deployment patterns.",
    href: "/industries",
  },
  {
    title: "Example ROI Cases",
    copy: "Benchmark scenarios for automation potential and annual savings.",
    href: "/roi-cases",
  },
];

const chatPrompts = [
  {
    prompt: "What services does Aethos AI offer?",
    expected:
      "Explain AI lead generation, knowledge assistants, workflow automation, AI audits, and strategy.",
  },
  {
    prompt: "I run a 10-person marketing agency and want to automate lead capture.",
    expected: "Suggest a lead qualification AI assistant.",
  },
  {
    prompt: "Do you build AI assistants using the Din_0 widget?",
    expected: "Explain Din_0-powered agents and use cases.",
  },
  {
    prompt: "I want to book a consultation.",
    expected: "Guide the user toward the booking page.",
  },
  {
    prompt: "Bonjour, proposez-vous des agents IA pour qualifier les leads ?",
    expected: "Respond correctly in French and describe lead qualification agents.",
  },
];

export default function Home() {
  const [copiedPrompt, setCopiedPrompt] = useState("");
  const [ctaHovered, setCtaHovered] = useState(false);
  const [ctaClickSignal, setCtaClickSignal] = useState(0);
  const [heroActivitySignal, setHeroActivitySignal] = useState(0);
  const [heroInViewport, setHeroInViewport] = useState(true);
  const [chatActive, setChatActive] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [visitorIntent, setVisitorIntent] = useState("unknown");
  const heroRef = useRef(null);
  const activityTickRef = useRef(0);

  async function copyPrompt(text) {
    await navigator.clipboard.writeText(text);
    setCopiedPrompt(text);
    setTimeout(() => setCopiedPrompt(""), 1200);
  }

  function registerHeroActivity() {
    const now = Date.now();
    if (now - activityTickRef.current > 700) {
      activityTickRef.current = now;
      setHeroActivitySignal((current) => current + 1);
    }
  }

  useEffect(() => {
    if (!heroRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInViewport(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const storedIntent = window.localStorage.getItem("visitorIntent");
    if (storedIntent) setVisitorIntent(storedIntent);
  }, []);

  useEffect(() => {
    const seenTour = window.localStorage.getItem("aethos_tour_seen");
    if (!seenTour) {
      setShowTour(true);
    }
  }, []);

  useEffect(() => {
    const onWidgetOpen = () => setChatActive(true);
    const onWidgetClose = () => setChatActive(false);
    window.addEventListener("din0:open", onWidgetOpen);
    window.addEventListener("din0:close", onWidgetClose);

    return () => {
      window.removeEventListener("din0:open", onWidgetOpen);
      window.removeEventListener("din0:close", onWidgetClose);
    };
  }, []);

  const intentCopy = {
    agency: "Priority focus: agency lead qualification, proposal pre-briefing, and follow-up automation.",
    "real-estate":
      "Priority focus: buyer intent scoring, visit qualification, and faster response to high-fit inquiries.",
    accounting:
      "Priority focus: client intake automation, advisory triage, and policy-aware knowledge assistance.",
    unknown:
      "Priority focus: practical AI lead generation automation and operational workflow automation for service teams.",
  };

  function updateIntent(nextIntent) {
    setVisitorIntent(nextIntent);
    window.localStorage.setItem("visitorIntent", nextIntent);
  }

  return (
    <main>
      <Seo
        title="AI Consulting for SMEs | Aethos AI"
        description="Aethos AI helps service businesses deploy practical AI assistants for lead capture, knowledge access, and workflow automation."
      />

      <ScrollRevealSection className="hero-section" once={false}>
        <div className="container hero-layout" ref={heroRef}>
          <div
            className="hero-content"
            onMouseMove={registerHeroActivity}
            onFocus={registerHeroActivity}
            onTouchStart={registerHeroActivity}
          >
            <AISignalBackground />
            <p className="eyebrow">AI Consulting for SMEs</p>
            <h1>Deploy AI agents that automate lead capture, support, and internal knowledge workflows.</h1>
            <p className="hero-copy muted">
              Aethos AI designs practical AI assistants that integrate into your existing tools and
              eliminate repetitive operational work.
            </p>
            <div className="page-intro-block">
              <p>
                {intentCopy[visitorIntent] || intentCopy.unknown}
              </p>
              <ul className="content-list">
                <li>Capture and qualify leads automatically.</li>
                <li>Reduce support workload with AI assistants.</li>
                <li>Give your team instant access to internal knowledge.</li>
              </ul>
            </div>
            <div className="hero-actions">
              <Link
                className="btn btn-primary pulse-cta"
                to="/tools/opportunity-studio"
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
                onFocus={() => setCtaHovered(true)}
                onBlur={() => setCtaHovered(false)}
                onClick={() => {
                  setCtaClickSignal((current) => current + 1);
                  registerHeroActivity();
                  trackEvent("cta_click", "/", { cta: "hero_primary_opportunity_map" });
                }}
              >
                Get Your AI Opportunity Map
              </Link>
              <Link className="btn btn-secondary" to="/#assistant-agents">
                Explore AI Solutions
              </Link>
            </div>
            <div className="hero-signals">
              <span>AI consulting for SMEs</span>
              <span>Din_0 companion widget</span>
              <span>Business-first implementation</span>
            </div>
            <div className="usecase-tabs intent-tabs">
              <button type="button" className={`chip-button ${visitorIntent === "agency" ? "active" : ""}`} onClick={() => updateIntent("agency")}>Agency</button>
              <button type="button" className={`chip-button ${visitorIntent === "real-estate" ? "active" : ""}`} onClick={() => updateIntent("real-estate")}>Real Estate</button>
              <button type="button" className={`chip-button ${visitorIntent === "accounting" ? "active" : ""}`} onClick={() => updateIntent("accounting")}>Accounting</button>
              <button type="button" className={`chip-button ${visitorIntent === "unknown" ? "active" : ""}`} onClick={() => updateIntent("unknown")}>General</button>
            </div>
            <div className="hero-din0-row">
              <Din0Companion
                inViewport={heroInViewport}
                ctaHovered={ctaHovered}
                ctaClickSignal={ctaClickSignal}
                chatActive={chatActive}
                activitySignal={heroActivitySignal}
              />
            </div>
          </div>

          <div className="hero-panel-stack">
            <aside className="hero-panel" aria-label="Value summary">
              <p className="panel-kicker">Consulting Focus</p>
              <h2>Deploy practical AI systems that improve lead quality and operational speed.</h2>
              <div className="panel-list">
                <p>AI assistants for websites that capture and qualify leads.</p>
                <p>AI automation for businesses with repetitive service workflows.</p>
                <p>AI knowledge assistants connected to internal documentation.</p>
              </div>
              <div className="panel-metrics">
                <div>
                  <AnimatedStat value={30} suffix="d" />
                  <span>Typical pilot delivery</span>
                </div>
                <div>
                  <AnimatedStat value={42} suffix="%" />
                  <span>Average automation potential</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </ScrollRevealSection>

      <WhyAdoptAI />

      <ScrollRevealSection className="section" id="interactive-exploration">
        <div className="container">
          <SectionHeader
            eyebrow="Interactive Guidance"
            title="Test AI opportunities before scheduling a consultation"
            description="These interactive modules help visitors understand implementation fit, expected workflow changes, and potential ROI impact."
          />
          <div className="cards-grid">
            <AIDemoBox />
            <WorkflowComparison />
            <ROISlider />
          </div>
        </div>
      </ScrollRevealSection>

      {showTour ? (
        <div className="tour-overlay" role="dialog" aria-modal="true" aria-label="Aethos quick tour">
          <div className="tour-card">
            <p className="eyebrow">Din_0 Tour</p>
            <h2>{tourSteps[tourIndex].title}</h2>
            <p className="muted">{tourSteps[tourIndex].description}</p>
            <div className="tour-actions">
              <Link className="btn btn-secondary" to={tourSteps[tourIndex].path} onClick={() => setShowTour(false)}>
                Open Step
              </Link>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setTourIndex((current) => (current + 1) % tourSteps.length)}
              >
                Next
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  window.localStorage.setItem("aethos_tour_seen", "1");
                  setShowTour(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <ScrollRevealSection className="section" id="assistant-agents">
        <div className="container">
          <SectionHeader
            eyebrow="Assistant Widget"
            title="AI Agents guided by Din_0"
            description="Aethos AI deploys conversational AI agents that capture and qualify leads, answer customer questions, automate repetitive workflows, integrate with CRM systems, and connect to internal knowledge bases."
          />
          <div className="page-intro-block">
            <p>
              Din_0 is embedded as a lightweight widget layer so teams can launch quickly while
              keeping integration options open for CRM, scheduling, and knowledge operations.
            </p>
          </div>
          <div className="cards-grid compact-grid">
            {chatHiveAgents.map((agent) => (
              <article key={agent} className="surface-card compact interactive-card">
                <h3>{agent}</h3>
                <ul className="content-list compact">
                  <li>Scope-aligned intents and qualification rules.</li>
                  <li>Structured payloads for CRM and workflow tools.</li>
                </ul>
              </article>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt" id="services">
        <div className="container">
          <SectionHeader
            eyebrow="Services"
            title="AI Systems We Build"
            description="A complete consulting offer from AI readiness to production deployment."
          />
          <div className="page-intro-block">
            <p>
              The service mix is designed for service businesses that need better lead quality and
              stronger delivery consistency without adding operational overhead.
            </p>
          </div>
          <UseCaseSwitcher />
          <div className="cards-grid">
            {aiSystems.map((service) => (
              <article key={service.title} className="surface-card interactive-card">
                <WorkflowMicroDiagram />
                <h3>{service.title}</h3>
                <p className="muted">{service.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section" id="implementations">
        <div className="container">
          <SectionHeader
            eyebrow="Credibility"
            title="Example AI Implementations"
            description="Representative outcomes from AI consulting for SMEs and service-led organizations."
          />
          <div className="cards-grid compact-grid">
            {implementations.map((item) => (
              <article key={item.title} className="surface-card compact interactive-card">
                <h3>{item.title}</h3>
                <p className="muted">{item.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt" id="chat-prompts">
        <div className="container">
          <SectionHeader
            eyebrow="Demo Readiness"
            title="Chat Assistant Demo Prompts"
            description="Use these prompts in the Din_0 widget during presentations and live demos."
          />
          <div className="cards-grid">
            {chatPrompts.map((item) => (
              <article key={item.prompt} className="surface-card interactive-card">
                <div className="prompt-row">
                  <h3>{item.prompt}</h3>
                  <button
                    type="button"
                    className="btn btn-secondary prompt-copy-btn"
                    onClick={() => copyPrompt(item.prompt)}
                  >
                    {copiedPrompt === item.prompt ? "Copied" : "Copy Prompt"}
                  </button>
                </div>
                <p className="muted"><strong>Expected behavior:</strong> {item.expected}</p>
              </article>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt" id="credibility-architecture">
        <div className="container">
          <SectionHeader
            eyebrow="Solution Architecture"
            title="From Consulting Website to Product-Like AI Platform"
            description="Explore the architecture, roadmap, industries, and ROI pages used to qualify opportunities with real implementation logic."
          />
          <div className="cards-grid">
            {credibilityLinks.map((item) => (
              <article key={item.title} className="surface-card interactive-card">
                <h3>{item.title}</h3>
                <p className="muted">{item.copy}</p>
                <Link className="btn btn-secondary" to={item.href}>Open</Link>
              </article>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      <ROIExamples />

      <HowWeWork />

      <ScrollRevealSection className="section" id="trust-signals">
        <div className="container">
          <SectionHeader
            eyebrow="Trust Signals"
            title="Technologies We Use"
            description="Production-ready stack for AI assistants, orchestration, and deployment."
          />
          <div className="pill-grid">
            {["OpenAI", "LangChain", "AWS", "Vector Databases", "Workflow Automation Tools"].map((tool) => (
              <span key={tool} className="pill-item">{tool}</span>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      <SocialProof />

      <FAQ />

      <ScrollRevealSection className="section final-cta">
        <div className="container final-cta-layout">
          <div>
            <h2>Get your AI opportunity assessment</h2>
            <p className="muted">
              In a short session we map your workflows and identify practical AI automation opportunities.
            </p>
            <ul className="content-list compact">
              <li>Get a scoped first pilot recommendation.</li>
              <li>Review expected timeline, effort, and business impact.</li>
              <li>Align priorities before committing to full rollout.</li>
            </ul>
          </div>
          <Link className="btn btn-primary pulse-cta" to="/book">
            Get Your AI Opportunity Assessment
          </Link>
        </div>
      </ScrollRevealSection>

      <Din0StickyAssistant visible={!heroInViewport} />
    </main>
  );
}
