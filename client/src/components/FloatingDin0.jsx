import { motion, useReducedMotion } from "framer-motion";
import Din0Sprite from "./Din0Sprite.jsx";
import Din0SpeechBubble from "./Din0SpeechBubble.jsx";

export default function FloatingDin0({
  message,
  className = "",
  showBubble = true,
  interactive = true,
}) {
  const reduceMotion = useReducedMotion();

  const floatAnimation = reduceMotion
    ? { y: 0 }
    : {
        y: [0, -6, 0],
      };

  return (
    <motion.div
      className={`din0-floating ${className}`.trim()}
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.42, delay: 0.28, ease: "easeOut" }}
    >
      {showBubble && message ? <Din0SpeechBubble message={message} /> : null}
      <motion.div
        className="din0-orb"
        animate={floatAnimation}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }
        whileHover={interactive && !reduceMotion ? { scale: 1.03 } : undefined}
      >
        <Din0Sprite className="din0-sprite" />
      </motion.div>
    </motion.div>
  );
}
