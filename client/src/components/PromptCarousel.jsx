import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function PromptCarousel({ items = [], interval = 3600, className = "" }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (items.length < 2) {
      return undefined;
    }

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, items.length]);

  const text = items[index] || "";

  if (reduceMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={text}
        className={className}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.24 }}
      >
        {text}
      </motion.p>
    </AnimatePresence>
  );
}
