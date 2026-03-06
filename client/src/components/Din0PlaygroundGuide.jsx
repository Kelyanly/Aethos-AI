import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import DinoAvatar from "./dino/DinoAvatar.jsx";
import useDin0Assistant from "../hooks/useDin0Assistant.js";

const prompts = [
  "Try the lead qualification demo",
  "Ask the knowledge assistant a question",
  "Use demo values",
  "Move to ROI once one demo is complete",
];

export default function Din0PlaygroundGuide() {
  const [promptIndex, setPromptIndex] = useState(0);
  const guideRef = useRef(null);
  const inView = useInView(guideRef, { amount: 0.45 });
  const { assistant, requestByAction, progress } = useDin0Assistant("playground");

  useEffect(() => {
    const timer = setInterval(() => {
      setPromptIndex((current) => (current + 1) % prompts.length);
    }, 3600);

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
      <DinoAvatar inViewport={inView} chatActive activitySignal={promptIndex} className="din0-guide-floating" />
      <motion.div
        className="din0-guide-progress"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 3.4, ease: "linear" }}
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
      <p className="small muted">Progress: {progress.explored}/{progress.total} tools explored</p>
      <div className="din0-guide-inline-actions">
        <button type="button" className="chip-button" onClick={() => requestByAction("open_demo")}>Refresh hints</button>
        <Link className="chip-button" to="/ai-roi-calculator">Try ROI</Link>
      </div>
    </aside>
  );
}
