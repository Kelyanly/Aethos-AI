import { Link } from "react-router-dom";
import Din0Sprite from "./Din0Sprite.jsx";

export default function Din0StickyAssistant({ visible }) {
  if (!visible) {
    return null;
  }

  return (
    <aside className="din0-sticky" aria-label="Din_0 quick assistant">
      <Din0Sprite className="din0-sticky-sprite" showBubble={false} inViewport={visible} />
      <Link to="/book" className="btn btn-primary">
        Book
      </Link>
    </aside>
  );
}
