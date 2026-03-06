import { motion, useReducedMotion } from "framer-motion";
import { Din0PixelFrame } from "./Din0Sprite.jsx";
import Din0SpeechBubble from "./Din0SpeechBubble.jsx";

const sparkles = [
  { id: "a", top: "14%", left: "14%" },
  { id: "b", top: "22%", right: "16%" },
  { id: "c", bottom: "18%", left: "18%" },
];

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
        <motion.div
          className="din0-shadow"
          animate={reduceMotion ? {} : { scaleX: [1, 1.08, 1], opacity: [0.25, 0.16, 0.25] }}
          transition={reduceMotion ? { duration: 0 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="din0-inner"
          animate={reduceMotion ? {} : { y: [0, -2, 0], rotate: [0, -0.6, 0.6, 0] }}
          transition={reduceMotion ? { duration: 0 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Din0PixelFrame className="din0-sprite" />
        </motion.div>
        {!reduceMotion ? (
          <div className="din0-sparkles" aria-hidden="true">
            {sparkles.map((sparkle, index) => (
              <motion.span
                key={sparkle.id}
                className="din0-sparkle"
                style={sparkle}
                animate={{ opacity: [0.15, 0.65, 0.15], scale: [0.9, 1.15, 0.9] }}
                transition={{
                  duration: 2.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.45,
                }}
              />
            ))}
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
