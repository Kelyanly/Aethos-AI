import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { trackEvent } from "../lib/analytics.js";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "AI Agents", href: "/agents" },
  { label: "Architecture", href: "/architecture" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Industries", href: "/industries" },
  { label: "AI Playground", href: "/lab" },
  { label: "ROI Calculator", href: "/ai-roi-calculator" },
  { label: "AI Roadmap", href: "/ai-roadmap" },
  { label: "Use Case Generator", href: "/ai-use-case-generator" },
  { label: "Opportunity Studio", href: "/ai-opportunity-studio" },
  { label: "Automation Score", href: "/automation-score" },
  { label: "AI Stack", href: "/ai-stack" },
  { label: "Insights", href: "/insights" },
];

function isRoute(href) {
  return href.startsWith("/") && !href.includes("#");
}

export default function RootLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  function closeMenu() {
    setIsMenuOpen(false);
  }

  useEffect(() => {
    trackEvent("page_view", location.pathname);
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container nav-shell">
          <div className="nav-bar">
            <Link to="/" className="brand" aria-label="Aethos AI home" onClick={closeMenu}>
              Aethos AI
            </Link>

            <nav className="desktop-nav" aria-label="Primary">
              {navItems.map((item) =>
                isRoute(item.href) ? (
                  <NavLink key={item.label} to={item.href} className="nav-item" end>
                    {item.label}
                  </NavLink>
                ) : (
                  <a key={item.label} href={item.href} className="nav-item">
                    {item.label}
                  </a>
                )
              )}
            </nav>

            <div className="nav-actions">
              <Link to="/book" className="btn btn-primary nav-cta pulse-cta" onClick={closeMenu}>
                Book a Consultation
              </Link>
              <button
                type="button"
                className="menu-toggle"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Toggle navigation"
                aria-expanded={isMenuOpen}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>

          <nav className={`mobile-nav ${isMenuOpen ? "open" : ""}`} aria-label="Mobile navigation">
            {navItems.map((item) =>
              isRoute(item.href) ? (
                <NavLink key={item.label} to={item.href} className="nav-item" onClick={closeMenu} end>
                  {item.label}
                </NavLink>
              ) : (
                <a key={item.label} href={item.href} onClick={closeMenu} className="nav-item">
                  {item.label}
                </a>
              )
            )}
            <Link to="/book" className="btn btn-primary" onClick={closeMenu}>
              Book a Consultation
            </Link>
          </nav>
        </div>
      </header>

      <Outlet />

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <p className="brand">Aethos AI</p>
            <p className="muted">
              AI consulting for SMEs, AI lead generation automation, and AI workflow automation for modern service businesses.
            </p>
          </div>
          <div>
            <p className="footer-title">Contact</p>
            <p className="muted">kellianmpiry@outlook.be</p>
            <p className="muted">Brussels, Belgium · Serving EU clients</p>
          </div>
          <div>
            <p className="footer-title">Explore</p>
            <Link to="/agents">AI Agents</Link>
            <Link to="/use-cases">AI Use Cases</Link>
            <Link to="/ai-roi-calculator">AI ROI Calculator</Link>
            <Link to="/ai-use-case-generator">AI Use Case Generator</Link>
            <Link to="/automation-score">Automation Score</Link>
            <Link to="/prompt-library">Prompt Library</Link>
            <Link to="/ai-stack">AI Stack</Link>
            <Link to="/case-study-generator">Case Study Generator</Link>
            <Link to="/architecture">AI Architecture</Link>
            <Link to="/implementation-roadmap">Implementation Roadmap</Link>
            <Link to="/book">Book a Consultation</Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <p className="muted">© 2026 Aethos AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
