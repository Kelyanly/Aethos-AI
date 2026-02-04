import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function App() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setMessage("Thanks! I will reply within 24 hours.");
      event.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please email me directly.");
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <nav className="nav">
          <div className="logo">Kellian AI Consulting</div>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#work">Projects</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">AI Consultant · Data Engineer · Data Scientist</p>
            <h1>Production-grade AI agents for public and financial institutions.</h1>
            <p className="lead">
              I design, build, and deploy trustworthy AI systems across Europe — from
              decision-support agents to data platforms that scale. I have delivered
              projects for the Belgian public sector, European Commission programs,
              and leading banks.
            </p>
            <div className="cta-row">
              <a className="primary" href="#contact">Book a consult</a>
              <a className="ghost" href="#work">View selected work</a>
            </div>
            <div className="trust-row">
              <span>Belgium · EU · Finance</span>
              <span>Governance-ready AI</span>
              <span>Secure deployments</span>
            </div>
          </div>

          <div className="hero-card">
            <div className="card-head">Signature capabilities</div>
            <ul>
              <li>Agentic workflows, tool orchestration, evaluation harnesses</li>
              <li>Data engineering & MLOps for regulated environments</li>
              <li>Responsible AI: auditability, monitoring, governance</li>
            </ul>
            <div className="metric">
              <div>
                <strong>20+</strong>
                <span>AI agent deployments</span>
              </div>
              <div>
                <strong>8+</strong>
                <span>European institutions</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="services" className="section">
          <div className="section-title">
            <h2>Services</h2>
            <p>End-to-end support from strategy to production delivery.</p>
          </div>
          <div className="cards">
            <article className="card">
              <h3>AI Strategy & Discovery</h3>
              <p>
                Executive workshops, opportunity mapping, feasibility studies, and
                roadmap creation aligned with compliance and ROI.
              </p>
            </article>
            <article className="card">
              <h3>Agent Systems & LLM Ops</h3>
              <p>
                Design and implementation of multi-agent systems, tool routing,
                evaluation frameworks, and production monitoring.
              </p>
            </article>
            <article className="card">
              <h3>Data Platforms & MLOps</h3>
              <p>
                Modern data pipelines, feature stores, governance, and cloud/on-prem
                deployments for regulated environments.
              </p>
            </article>
          </div>
        </section>

        <section id="work" className="section alt">
          <div className="section-title">
            <h2>Selected work</h2>
            <p>Representative missions delivered for public and financial sectors.</p>
          </div>
          <div className="work-grid">
            <div className="work-item">
              <h3>Public sector AI assistant</h3>
              <p>
                Built a secure multi-agent assistant for policy analysis with audit
                trails, summaries, and multilingual reporting.
              </p>
              <span>Belgian public administration</span>
            </div>
            <div className="work-item">
              <h3>Banking risk intelligence</h3>
              <p>
                Deployed an AI workflow to analyze counterparty risk signals and
                generate compliance-ready reports.
              </p>
              <span>Major European bank</span>
            </div>
            <div className="work-item">
              <h3>EU program knowledge engine</h3>
              <p>
                Designed a retrieval system for program officers with controlled
                access, source traceability, and evaluation metrics.
              </p>
              <span>European Commission initiative</span>
            </div>
          </div>
        </section>

        <section id="process" className="section">
          <div className="section-title">
            <h2>Delivery process</h2>
            <p>A structured, fast-moving approach with measurable milestones.</p>
          </div>
          <div className="process">
            <div>
              <h4>1. Diagnose</h4>
              <p>Stakeholder interviews, data audits, risk assessment.</p>
            </div>
            <div>
              <h4>2. Prototype</h4>
              <p>Rapid proof-of-value with evaluation and safety checks.</p>
            </div>
            <div>
              <h4>3. Deploy</h4>
              <p>Hardened architecture, MLOps pipelines, monitoring.</p>
            </div>
            <div>
              <h4>4. Scale</h4>
              <p>Training, governance, and continuous improvement.</p>
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="section-title">
            <h2>Why teams hire me</h2>
          </div>
          <div className="pillars">
            <div>
              <h4>Regulated experience</h4>
              <p>
                Proven delivery for public and financial stakeholders with strict
                security and audit requirements.
              </p>
            </div>
            <div>
              <h4>Full-stack AI delivery</h4>
              <p>
                I span strategy, data engineering, ML, and deployment to ensure
                systems actually ship.
              </p>
            </div>
            <div>
              <h4>Human-centered adoption</h4>
              <p>
                Workshops, training, and change management so teams trust the
                system and use it daily.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="section-title">
            <h2>Let’s work together</h2>
            <p>Tell me about your mission and I will respond within 24 hours.</p>
          </div>
          <div className="contact-grid">
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Name
                <input name="name" type="text" required />
              </label>
              <label>
                Email
                <input name="email" type="email" required />
              </label>
              <label>
                Organization
                <input name="company" type="text" />
              </label>
              <label>
                Project goals
                <textarea name="message" rows="5" required />
              </label>
              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send request"}
              </button>
              {message && <p className={`form-msg ${status}`}>{message}</p>}
            </form>

            <div className="contact-panel">
              <h3>Availability</h3>
              <p>
                Based in Belgium, working across Europe. I take on a limited number
                of consulting engagements to guarantee focus and rapid delivery.
              </p>
              <div className="panel-block">
                <h4>Typical engagements</h4>
                <ul>
                  <li>AI strategy sprint (2-3 weeks)</li>
                  <li>Agent MVP build (4-8 weeks)</li>
                  <li>Governance & MLOps setup (ongoing)</li>
                </ul>
              </div>
              <div className="panel-block">
                <h4>Contact</h4>
                <p>hello@yourdomain.com</p>
                <p>Brussels · Remote across EU</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>Kellian AI Consulting</strong>
          <p>AI agents, data platforms, and responsible deployment.</p>
        </div>
        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#work">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>

      {/* ChatHive widget mount point */}
      {/* <div id="chathive-widget" /> */}
    </div>
  );
}
