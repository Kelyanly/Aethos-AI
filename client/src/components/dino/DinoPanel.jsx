import { useState } from "react";
import DinoChat from "./DinoChat.jsx";
import DinoSuggestions from "./DinoSuggestions.jsx";
import DinoTour from "./DinoTour.jsx";

export default function DinoPanel({ assistant, loading, progress, onRefresh, onAsk }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`dino-panel-shell ${open ? "open" : ""}`}>
      <button
        type="button"
        className="btn btn-secondary dino-panel-toggle"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="dino-panel"
      >
        {open ? "Hide Din_0 concierge" : "Open Din_0 concierge"}
      </button>

      {open ? (
        <div className="dino-panel" id="dino-panel">
          <DinoSuggestions
            assistant={assistant}
            loading={loading}
            onRefresh={onRefresh}
            onAction={(action) => onAsk(action === "dismiss" ? "Dismiss current suggestion" : "Provide a short follow-up suggestion")}
          />
          <DinoChat onAsk={onAsk} disabled={loading} />
          <DinoTour progress={progress} />
        </div>
      ) : null}
    </div>
  );
}
