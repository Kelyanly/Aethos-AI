import Seo from "../components/Seo.jsx";

const articles = [
  {
    title: "How AI assistants capture qualified leads automatically",
    excerpt:
      "A practical framework for building AI lead generation automation that improves lead quality and sales response speed.",
  },
  {
    title: "AI automation for service businesses",
    excerpt:
      "Where to start with AI workflow automation when your team is overloaded with repetitive operations.",
  },
  {
    title: "Practical AI use cases for SMEs",
    excerpt:
      "Examples of AI consulting for SMEs with measurable business impact and low complexity rollout.",
  },
  {
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

      <section className="section booking-intro">
        <div className="container">
          <h1>Insights</h1>
          <p className="hero-copy muted">
            Practical articles on AI automation for businesses, implementation strategy, and applied consulting insights.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container cards-grid compact-grid">
          {articles.map((article) => (
            <article key={article.title} className="surface-card compact">
              <h2>{article.title}</h2>
              <p className="muted">{article.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
