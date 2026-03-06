import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import useDin0StateMachine from "../hooks/useDin0StateMachine.js";
import "./Din0Sprite.css";

const PIXEL = 3;

const palette = {
  ".": null,
  O: "#0f1720",
  G: "#22c55e",
  D: "#15803d",
  L: "#4ade80",
  B: "#d9f99d",
  E: "#ffffff",
  K: "#0f1720",
  S: "#bbf7d0",
  M: "#14532d",
  H: "#86efac",
  T: "#6ee7b7",
};

const BASE_FRAME = [
  "....................",
  "......OO............",
  "....OOGGO...........",
  "...OGGGGGO..........",
  "..OGGLLLLGO.........",
  "..OGLLLLLLGO........",
  ".OGLLKELLLLGO.......",
  ".OGLLLLLLLLLGO......",
  "OGLLLLBLLLLLGO......",
  "OGLLLLBLLLLLGO......",
  "OGLLLLLLLLLLLGO.....",
  ".OGGGLLLLLLLLLGO....",
  ".OGGGGLLLGLLLLLGO...",
  "..OGDGGLLLGGGGGGO...",
  "..OGDDGGGGGGOGGGO...",
  ".OGDDDGGGGG..OGGO...",
  ".OGDDGGGG....OGGO...",
  "..OOO.........OO....",
  "....................",
  "....................",
].map((row) => row.replace(/\s/g, ""));

function withCells(baseFrame, cells) {
  const grid = baseFrame.map((row) => row.split(""));
  cells.forEach(([x, y, value]) => {
    if (grid[y] && grid[y][x] !== undefined) {
      grid[y][x] = value;
    }
  });
  return grid.map((row) => row.join(""));
}

const BLINK = withCells(BASE_FRAME, [
  [7, 6, "M"],
  [8, 6, "M"],
]);

const GLANCE = withCells(BASE_FRAME, [
  [8, 6, "E"],
  [9, 6, "K"],
]);

const SLEEP_1 = withCells(BASE_FRAME, [
  [7, 6, "M"],
  [8, 6, "M"],
  [10, 3, "S"],
]);

const SLEEP_2 = withCells(SLEEP_1, [
  [9, 2, "S"],
  [11, 2, "S"],
]);

const TALK_1 = withCells(BASE_FRAME, [
  [10, 9, "M"],
]);

const TALK_2 = withCells(BASE_FRAME, [
  [10, 9, "M"],
  [9, 10, "M"],
]);

const TALK_3 = withCells(BASE_FRAME, [
  [10, 8, "M"],
  [9, 9, "M"],
]);

const JUMP_PREP = withCells(BASE_FRAME, [
  [2, 17, "."],
  [3, 17, "O"],
  [14, 17, "O"],
  [15, 17, "."],
]);

const JUMP_MID = withCells(BASE_FRAME, [
  [1, 15, "."],
  [2, 16, "."],
  [3, 16, "."],
  [7, 4, "H"],
  [8, 4, "H"],
]);

const CTA_REACT = withCells(BASE_FRAME, [
  [7, 6, "H"],
  [8, 6, "H"],
  [9, 6, "H"],
  [10, 6, "H"],
]);

const SPRITES = {
  idle: [BASE_FRAME, BASE_FRAME, BLINK, BASE_FRAME, GLANCE, BASE_FRAME],
  sleep: [SLEEP_1, SLEEP_2],
  wake: [SLEEP_2, SLEEP_1, BLINK, BASE_FRAME],
  talk: [TALK_1, TALK_2, TALK_3],
  jump: [JUMP_PREP, JUMP_MID, BASE_FRAME],
  ctaReact: [BASE_FRAME, CTA_REACT, BASE_FRAME],
};

const STATE_CONFIG = {
  idle: { fps: 2.2, loop: true },
  sleep: { fps: 1, loop: true },
  wake: { fps: 8, loop: false },
  talk: { fps: 5.5, loop: true },
  jump: { fps: 9, loop: false },
  ctaReact: { fps: 4.2, loop: true },
};

const STATE_COPY = {
  idle: "Din_0: Want a quick AI use-case idea?",
  sleep: "Din_0 is recharging...",
  wake: "Back online. Ready to guide.",
  talk: "Din_0 is thinking...",
  jump: "Great choice. Let us map your roadmap.",
  ctaReact: "Best place to start: consultation.",
};

function buildPixels(frame) {
  const pixels = [];
  frame.forEach((row, y) => {
    row.split("").forEach((cell, x) => {
      if (palette[cell]) {
        pixels.push([x, y, palette[cell]]);
      }
    });
  });
  return pixels;
}

function PixelFrame({ frame, className = "", title = "Din_0 mascot" }) {
  const pixels = useMemo(() => buildPixels(frame), [frame]);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${frame[0].length * PIXEL} ${frame.length * PIXEL}`}
      role="img"
      aria-label={title}
      shapeRendering="crispEdges"
    >
      {pixels.map(([x, y, color]) => (
        <rect
          key={`${x}-${y}-${color}`}
          x={x * PIXEL}
          y={y * PIXEL}
          width={PIXEL}
          height={PIXEL}
          fill={color}
        />
      ))}
    </svg>
  );
}

export const Din0PixelFrame = memo(function Din0PixelFrame({
  state = "idle",
  frameIndex = 0,
  className = "",
  title = "Din_0 mascot",
}) {
  const frames = SPRITES[state] ?? SPRITES.idle;
  const safeIndex = Math.max(0, Math.min(frameIndex, frames.length - 1));
  return <PixelFrame frame={frames[safeIndex]} className={className} title={title} />;
});

export default function Din0Sprite({
  className = "",
  inViewport = true,
  ctaHovered = false,
  ctaClickSignal = 0,
  chatActive = false,
  activitySignal = 0,
  showBubble = true,
  onNonLoopAnimationEnd,
}) {
  const reducedMotion = useReducedMotion();
  const [frameIndex, setFrameIndex] = useState(0);
  const endedRef = useRef(false);

  const { state, wakeDin0, markActive, onNonLoopEnd } = useDin0StateMachine({
    inViewport,
    ctaHovered,
    ctaClickSignal,
    chatActive,
    activitySignal,
  });

  const activeState = reducedMotion ? "idle" : state;
  const stateConfig = STATE_CONFIG[activeState] ?? STATE_CONFIG.idle;
  const frames = SPRITES[activeState] ?? SPRITES.idle;
  const shouldAnimate = inViewport && !reducedMotion && frames.length > 1;

  useEffect(() => {
    setFrameIndex(0);
    endedRef.current = false;
  }, [activeState]);

  useEffect(() => {
    if (!shouldAnimate) {
      setFrameIndex(0);
      return;
    }

    const frameDuration = 1000 / stateConfig.fps;
    let rafId;
    let lastTime = performance.now();

    const tick = (now) => {
      if (now - lastTime >= frameDuration) {
        setFrameIndex((current) => {
          const next = current + 1;

          if (next >= frames.length) {
            if (stateConfig.loop) {
              return 0;
            }

            if (!endedRef.current) {
              endedRef.current = true;
              onNonLoopEnd(activeState);
              onNonLoopAnimationEnd?.(activeState);
            }
            return frames.length - 1;
          }

          return next;
        });
        lastTime = now;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [
    activeState,
    frames.length,
    onNonLoopAnimationEnd,
    onNonLoopEnd,
    shouldAnimate,
    stateConfig.fps,
    stateConfig.loop,
  ]);

  return (
    <div className={`din0-companion ${className}`.trim()}>
      <button
        type="button"
        className="din0-sprite-card"
        onMouseEnter={wakeDin0}
        onFocus={wakeDin0}
        onMouseMove={markActive}
        aria-label="Din_0 companion"
      >
        <Din0PixelFrame state={activeState} frameIndex={frameIndex} className="din0-sprite-frame" />
      </button>

      {showBubble ? (
        <p className={`din0-dialogue din0-state-${activeState}`} aria-live="polite">
          {STATE_COPY[activeState]}
        </p>
      ) : null}
    </div>
  );
}
