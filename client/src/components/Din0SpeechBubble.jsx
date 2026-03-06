import { AnimatePresence, motion } from "framer-motion";

export default function Din0SpeechBubble({ message, visible = true, compact = false }) {
  return (
    <AnimatePresence mode="wait">
      {visible ? (
        <motion.div
          key={message}
          className={`din0-speech-bubble${compact ? " compact" : ""}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
