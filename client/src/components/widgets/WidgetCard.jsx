import { motion, useReducedMotion } from "framer-motion";

export default function WidgetCard({ title, subtitle, children, footer, icon, badge, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`widget-card surface-card interactive-card ${className}`.trim()}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      whileHover={reduceMotion ? {} : { y: -2 }}
    >
      <div className="widget-card-header">
        <div className="widget-card-title-block">
          <div className="widget-card-topline">
            {icon ? <span className="widget-card-icon" aria-hidden="true">{icon}</span> : null}
            {subtitle ? <p className="widget-card-subtitle">{subtitle}</p> : null}
          </div>
          <h3>{title}</h3>
        </div>
        {badge ? <span className="widget-card-badge">{badge}</span> : null}
      </div>
      <div className="widget-card-body">{children}</div>
      {footer ? <div className="widget-card-footer">{footer}</div> : null}
    </motion.article>
  );
}
