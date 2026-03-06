import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";
import { Link } from "react-router-dom";

const articles = [
  {
    slug: "ai-lead-qualification",
    title: "How AI assistants capture qualified leads automatically",
    excerpt:
      "A practical framework for building AI lead generation automation that improves lead quality and sales response speed.",
  },
  {
    slug: "ai-workflow-automation",
    title: "AI automation for service businesses",
    excerpt:
      "Where to start with AI workflow automation when your team is overloaded with repetitive operations.",
  },
  {
    slug: "ai-agents-explained",
    title: "Practical AI use cases for SMEs",
    excerpt:
      "Examples of AI consulting for SMEs with measurable business impact and low complexity rollout.",
  },
  {
    slug: "ai-agents-explained",
    title: "Building AI knowledge assistants with RAG",
    excerpt:
      "How to connect internal knowledge bases to AI assistants while preserving answer reliability.",
  },
];

export default function Insights() {
  return (
    <main>
      <Seo
        title="AI Insights and Practical Guides | Aethos AI"
        description="Thought leadership and practical content on AI assistants, AI workflow automation, RAG, and AI consulting for SMEs."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container">
          <h1>Insights</h1>
          <p className="hero-copy muted">
            Practical articles on AI automation for businesses, implementation strategy, and applied consulting insights.
          </p>
          <div className="page-intro-block">
            <p>
              This library supports SEO and buyer education with practical guidance on AI lead
              generation automation, knowledge assistants, and deployment strategy.
            </p>
            <ul className="content-list">
              <li>Implementation patterns for SMEs and service businesses.</li>
              <li>Operational trade-offs and rollout recommendations.</li>
              <li>Examples you can reuse in internal planning discussions.</li>
            </ul>
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container cards-grid compact-grid">
          {articles.map((article) => (
            <article key={article.title} className="surface-card compact interactive-card">
              <h2>{article.title}</h2>
              <p className="muted">{article.excerpt}</p>
              <Link className="btn btn-secondary" to={`/insights/${article.slug}`}>Read Article</Link>
            </article>
          ))}
        </div>
      </ScrollRevealSection>
    </main>
  );
}
