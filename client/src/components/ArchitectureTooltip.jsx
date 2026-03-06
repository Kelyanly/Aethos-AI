import { useState } from "react";

export default function ArchitectureTooltip({ copy }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="arch-tooltip"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button type="button" className="arch-tooltip-trigger" aria-label="Show architecture note">
        i
      </button>
      {open ? <p className="arch-tooltip-popover">{copy}</p> : null}
    </div>
  );
}
