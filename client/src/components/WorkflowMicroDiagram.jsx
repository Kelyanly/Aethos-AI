import { motion, useReducedMotion } from "framer-motion";

export default function WorkflowMicroDiagram() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="workflow-mini" aria-hidden="true">
      <span className="workflow-node" />
      <motion.span
        className="workflow-line"
        animate={reduceMotion ? {} : { scaleX: [0.45, 1, 0.45] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="workflow-node" />
      <motion.span
        className="workflow-line"
        animate={reduceMotion ? {} : { scaleX: [1, 0.45, 1] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <span className="workflow-node" />
    </div>
  );
}
