export default function ExpandableCard({
  eyebrow,
  title,
  preview,
  details,
  bullets = [],
  children,
  compact = false,
  leading,
}) {
  return (
    <details className={`surface-card interactive-card expandable-card${compact ? ' compact' : ''}`}>
      <summary className="expandable-card-trigger">
        {leading ? <div className="expandable-card-leading">{leading}</div> : null}
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <div className="expandable-card-summary-row">
          <div className="expandable-card-copy">
            <h3>{title}</h3>
            {preview ? <p className="muted">{preview}</p> : null}
          </div>
          <span className="expandable-card-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </div>
      </summary>

      <div className="expandable-card-body">
        {details ? <p className="muted">{details}</p> : null}
        {bullets.length ? (
          <ul className="content-list compact">
            {bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {children}
      </div>
    </details>
  );
}
