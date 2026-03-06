import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { trackEvent } from "../lib/analytics.js";

const topLinks = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/about" },
  { label: "AI Playground", href: "/lab" },
  { label: "Opportunity Studio", href: "/tools/opportunity-studio" },
  { label: "Insights", href: "/insights" },
];

const navGroups = [
  {
    label: "Solutions",
    items: [
      { label: "AI Agents", href: "/agents" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Industries", href: "/industries" },
      { label: "AI Architecture", href: "/architecture" },
      { label: "Implementation Roadmap", href: "/implementation-roadmap" },
      { label: "ROI Cases", href: "/roi-cases" },
      { label: "AI Stack", href: "/ai-stack" },
    ],
  },
  {
    label: "Tools",
    items: [
      { label: "AI ROI Calculator", href: "/ai-roi-calculator" },
      { label: "AI Roadmap", href: "/ai-roadmap" },
      { label: "AI Use Case Generator", href: "/ai-use-case-generator" },
      { label: "Automation Score", href: "/automation-score" },
      { label: "Prompt Library", href: "/prompt-library" },
      { label: "Case Study Generator", href: "/case-study-generator" },
    ],
  },
];

function isRoute(href) {
  return href.startsWith("/") && !href.includes("#");
}

function isGroupActive(group, pathname) {
  return group.items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
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
              {topLinks.map((item) =>
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

              {navGroups.map((group) => (
                <div
                  key={group.label}
                  className={`nav-group ${isGroupActive(group, location.pathname) ? "active" : ""}`}
                >
                  <button type="button" className="nav-group-trigger" aria-haspopup="menu">
                    {group.label}
                    <span aria-hidden="true">▾</span>
                  </button>
                  <div className="nav-group-menu" role="menu" aria-label={group.label}>
                    {group.items.map((item) => (
                      <NavLink key={item.href} to={item.href} className="nav-group-link" onClick={closeMenu}>
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            <div className="nav-actions">
              <Link to="/book" className="btn btn-primary nav-cta pulse-cta" onClick={closeMenu}>
                Get Your AI Opportunity Assessment
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
            {topLinks.map((item) =>
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

            {navGroups.map((group) => (
              <div key={group.label} className="mobile-nav-group">
                <p className="mobile-nav-title">{group.label}</p>
                {group.items.map((item) => (
                  <NavLink key={item.href} to={item.href} className="nav-item" onClick={closeMenu}>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            ))}

            <Link to="/book" className="btn btn-primary" onClick={closeMenu}>
              Get Your AI Opportunity Assessment
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
              Aethos AI delivers AI consulting for SMEs, AI lead generation automation, and AI workflow automation for modern service businesses.
            </p>
            <p className="muted">
              We design practical assistants that integrate with your existing tools and improve operational consistency.
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
            <Link to="/tools/opportunity-studio">Opportunity Studio</Link>
            <Link to="/ai-roi-calculator">AI ROI Calculator</Link>
            <Link to="/about">About Aethos AI</Link>
            <Link to="/book">Get Your AI Opportunity Assessment</Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <p className="muted">© 2026 Aethos AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
