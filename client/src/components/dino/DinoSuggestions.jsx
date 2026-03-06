import { Link } from "react-router-dom";

export default function DinoSuggestions({ assistant, loading, onRefresh, onAction }) {
  const message = loading ? "Din_0 is thinking..." : assistant?.message;
  const actions = assistant?.suggestedActions || [];

  return (
    <div className="dino-suggestions" aria-live="polite">
      <p className="dino-suggestions-message">{message}</p>
      <div className="dino-suggestions-actions">
        {actions.map((action) => (
          action.href?.startsWith("/") ? (
            <Link
              key={`${action.href}-${action.label}`}
              className={`btn ${action.href === "/book" ? "btn-primary" : "btn-secondary"}`}
              to={action.href}
            >
              {action.label}
            </Link>
          ) : (
            <button
              key={`${action.href}-${action.label}`}
              type="button"
              className="btn btn-secondary"
              onClick={() => onAction?.(action.href || "")}
            >
              {action.label}
            </button>
          )
        ))}
        <button type="button" className="btn btn-secondary" onClick={onRefresh}>
          Refresh
        </button>
      </div>
    </div>
  );
}
