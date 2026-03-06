import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FloatingDin0 from "./FloatingDin0.jsx";

const prompts = [
  "Try the lead qualification demo",
  "Ask the knowledge assistant a question",
  "Use demo values to run fast",
];

export default function Din0PlaygroundGuide() {
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPromptIndex((current) => (current + 1) % prompts.length);
    }, 3400);

    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="din0-playground-guide" aria-label="Din_0 guide">
      <FloatingDin0 message={prompts[promptIndex]} className="din0-guide-floating" />
      <motion.p
        key={prompts[promptIndex]}
        className="din0-guide-caption"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        Din_0 can help you pick a demo scenario quickly.
      </motion.p>
    </aside>
  );
}
