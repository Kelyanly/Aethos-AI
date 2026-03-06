import { motion, useReducedMotion } from "framer-motion";
import { motionTokens } from "./motion/motionTokens.js";

export default function ScrollRevealSection({ as = "section", className = "", children, once = true }) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] || motion.section;

  if (reduceMotion) {
    return <section className={className}>{children}</section>;
  }

  return (
    <Component
      className={className}
      initial={motionTokens.reveal.initial}
      whileInView={motionTokens.reveal.animate}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: motionTokens.duration.base, ease: motionTokens.ease.smooth }}
    >
      {children}
    </Component>
  );
}
