import { useEffect } from "react";

export default function InteractionExampleModal({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return;

    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal-card" role="document">
        <div className="modal-header">
          <h3>{title}</h3>
          <button type="button" className="btn btn-secondary" onClick={onClose} aria-label="Close modal">
            Close
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
