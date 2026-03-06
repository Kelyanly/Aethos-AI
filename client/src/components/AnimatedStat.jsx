import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export default function AnimatedStat({ value, suffix = "", duration = 900, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const reduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) {
      setDisplayValue(value);
      return;
    }

    let raf;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplayValue(Math.round(value * progress));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, inView, reduceMotion, value]);

  return (
    <strong ref={ref} className={className}>
      {displayValue}
      {suffix}
    </strong>
  );
}
