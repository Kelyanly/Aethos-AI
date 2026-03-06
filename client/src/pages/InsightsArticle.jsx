import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";

const articles = {
  "ai-lead-qualification": {
    title: "How AI assistants increase lead conversion",
    description: "A practical framework for using AI assistants to qualify and convert inbound website leads.",
    paragraphs: [
      "AI lead qualification works best when assistants ask short, high-signal questions: use case, urgency, budget fit, and decision timing.",
      "For service businesses, the operational gain is immediate: fewer unqualified calls and faster response time for high-fit leads.",
      "The highest-performing setup combines assistant qualification with CRM routing, scheduling automation, and follow-up triggers.",
    ],
    keyTakeaways: [
      "Use short qualification flows with clear intent questions.",
      "Route high-fit leads to humans quickly to protect conversion.",
      "Integrate assistant outputs into CRM and follow-up workflows.",
    ],
  },
  "ai-workflow-automation": {
    title: "AI workflow automation for service businesses",
    description: "Where to automate first and how to deliver measurable ROI with low implementation risk.",
    paragraphs: [
      "Start with repetitive handoffs: intake processing, ticket triage, and recurring reporting.",
      "Use an assistant to gather context, then route structured payloads to workflow automations.",
      "A 30-day pilot with one KPI usually outperforms broad, unfocused automation attempts.",
    ],
    keyTakeaways: [
      "Prioritize one high-friction workflow first.",
      "Use structured payloads for reliable automation handoff.",
      "Track one KPI during pilot to validate value quickly.",
    ],
  },
  "ai-agents-explained": {
    title: "AI agents explained for SMEs",
    description: "What an AI agent is, how it connects to your systems, and where it creates value first.",
    paragraphs: [
      "AI agents combine language understanding with workflow actions and business rules.",
      "For SMEs, most value comes from lead capture, internal knowledge retrieval, and customer support triage.",
      "A good deployment model includes guardrails, escalation paths, and periodic prompt optimization.",
    ],
    keyTakeaways: [
      "AI agents should follow clear scope and business rules.",
      "Highest value usually comes from repetitive communication workflows.",
      "Governance and escalation paths are required for production use.",
    ],
  },
};

export default function InsightsArticle() {
  const { slug } = useParams();
  const article = articles[slug] || articles["ai-agents-explained"];

  return (
    <main>
      <Seo title={`${article.title} | Aethos AI`} description={article.description} />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>{article.title}</h1>
          <p className="hero-copy muted">{article.description}</p>
          <div className="page-intro-block">
            <p>
              This article is written in practical language for founders and operations leaders who
              are evaluating AI consulting for SMEs.
            </p>
          </div>
          <Link to="/insights" className="btn btn-secondary">Back to Insights</Link>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container article-body">
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h2>Key takeaways</h2>
          <ul className="content-list">
            {article.keyTakeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </ScrollRevealSection>
    </main>
  );
}
