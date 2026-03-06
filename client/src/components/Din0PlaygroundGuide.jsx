import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Din0Sprite from "./Din0Sprite.jsx";
import useDin0Assistant from "../hooks/useDin0Assistant.js";

const prompts = [
  "Try the lead qualification demo",
  "Ask the knowledge assistant a question",
  "Use demo values",
];

export default function Din0PlaygroundGuide() {
  const [promptIndex, setPromptIndex] = useState(0);
  const guideRef = useRef(null);
  const inView = useInView(guideRef, { amount: 0.45 });
  const { assistant, requestByAction } = useDin0Assistant("playground");

  useEffect(() => {
    const timer = setInterval(() => {
      setPromptIndex((current) => (current + 1) % prompts.length);
    }, 3400);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    requestByAction("open_demo");
  }, [requestByAction]);

  useEffect(() => {
    requestByAction("ask_question", prompts[promptIndex]);
  }, [promptIndex, requestByAction]);

  return (
    <aside className="din0-playground-guide" aria-label="Din_0 guide" ref={guideRef}>
      <Din0Sprite
        className="din0-guide-floating"
        inViewport={inView}
        chatActive
        activitySignal={promptIndex}
      />
      <motion.div
        className="din0-guide-progress"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 3.2, ease: "linear" }}
        key={promptIndex}
      />
      <motion.p
        key={prompts[promptIndex] + assistant.message}
        className="din0-guide-caption"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {assistant.message || prompts[promptIndex]}
      </motion.p>
    </aside>
  );
}
