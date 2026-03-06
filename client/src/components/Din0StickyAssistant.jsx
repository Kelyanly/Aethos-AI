import { Link } from "react-router-dom";
import DinoAvatar from "./dino/DinoAvatar.jsx";

export default function Din0StickyAssistant({ visible }) {
  if (!visible) {
    return null;
  }

  return (
    <aside className="din0-sticky" aria-label="Din_0 quick assistant">
      <DinoAvatar inViewport={visible} className="din0-sticky-sprite" activitySignal={1} />
      <div className="din0-sticky-content">
        <p className="small muted">Need help exploring AI automation?</p>
        <Link to="/book" className="btn btn-primary">
          Assess
        </Link>
      </div>
    </aside>
  );
}
