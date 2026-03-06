import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "Use Cases", href: "/#use-cases" },
  { label: "Process", href: "/#process" },
  { label: "Why Aethos", href: "/#why-aethos" },
];

export default function RootLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container nav-shell">
          <div className="nav-bar">
            <Link to="/" className="brand" aria-label="Aethos AI home" onClick={closeMenu}>
              Aethos AI
            </Link>

            <nav className="desktop-nav" aria-label="Primary">
              {navItems.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="nav-actions">
              <Link to="/book" className="btn btn-primary nav-cta" onClick={closeMenu}>
                Book Consultation
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
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            <Link to="/book" className="btn btn-primary" onClick={closeMenu}>
              Book Consultation
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
              AI consulting for lead generation, knowledge assistants, and workflow
              automation.
            </p>
          </div>
          <div>
            <p className="footer-title">Contact</p>
            <p className="muted">kellianmpiry@outlook.be</p>
            <p className="muted">Brussels, Belgium · Serving EU clients</p>
          </div>
          <div>
            <p className="footer-title">Links</p>
            <a href="/#services">Services</a>
            <a href="/#use-cases">Use Cases</a>
            <Link to="/book">Book Consultation</Link>
            <a
              href="https://www.linkedin.com/in/john-francis-kellian-mpiry/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <p className="muted">© 2026 Aethos AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
