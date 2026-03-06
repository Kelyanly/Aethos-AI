import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import useDin0StateMachine from "../hooks/useDin0StateMachine.js";
import "./Din0Sprite.css";

const PIXEL = 3;

const palette = {
  ".": null,
  O: "#0f1720",
  G: "#1f6b4f",
  S: "#5eaf8f",
  B: "#d8eee3",
  E: "#ffffff",
  P: "#0f1720",
  R: "#cf2f2f",
  C: "#294338",
  M: "#173127",
  H: "#89d3b4",
};

/**
 * Placeholder frame system until final sprite sheets are available.
 * Drop-in expected asset structure:
 * /client/src/assets/din0/idle.png
 * /client/src/assets/din0/sleep.png
 * /client/src/assets/din0/wake.png
 * /client/src/assets/din0/talk.png
 * /client/src/assets/din0/jump.png
 * Suggested frame size: 48x51 px (16x17 cells @ 3px) with per-state frame strips.
 */
const BASE_FRAME = [
  "................",
  "......OOOO......",
  "....OOOGGGOO....",
  "...OOGGGGGGGO...",
  "...OGGGRRGGGO...",
  "..OGGGGGGGGGGO..",
  "..OGGGGBBGGGGO..",
  ".OGGGGGBBBGGGGO.",
  ".OGGGGGGGGGGGGO.",
  ".OGGGGGGGGGGGGO.",
  "..OGGGGGGGGGGO..",
  "..OGGGOGGGOGGO..",
  "...OGGOOOOOGGO..",
  "...OGGGGGGGGGO..",
  "..OOGGGGGGGGOO..",
  ".OOGGGGOOGGGGOO.",
  ".OGGGO....OGGGO.",
  "..OO........OO..",
];

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
  [7, 3, "C"],
  [8, 3, "C"],
]);

const SLEEP_1 = withCells(BASE_FRAME, [
  [7, 3, "C"],
  [8, 3, "C"],
  [9, 2, "S"],
]);

const SLEEP_2 = withCells(SLEEP_1, [
  [7, 1, "S"],
  [8, 1, "S"],
]);

const TALK_1 = withCells(BASE_FRAME, [
  [8, 9, "M"],
  [7, 9, "M"],
]);

const TALK_2 = withCells(BASE_FRAME, [[8, 10, "M"]]);

const TALK_3 = withCells(BASE_FRAME, [
  [7, 9, "M"],
  [8, 9, "M"],
  [8, 10, "M"],
]);

const JUMP_PREP = withCells(BASE_FRAME, [
  [1, 14, "."],
  [2, 14, "O"],
  [3, 14, "G"],
  [4, 14, "G"],
  [10, 14, "G"],
  [11, 14, "O"],
  [12, 14, "."],
]);

const JUMP_MID = withCells(BASE_FRAME, [
  [2, 16, "."],
  [13, 16, "."],
  [7, 1, "H"],
  [8, 1, "H"],
]);

const CTA_REACT = withCells(BASE_FRAME, [
  [7, 3, "R"],
  [8, 3, "R"],
  [9, 3, "R"],
]);

const SPRITES = {
  idle: [BASE_FRAME, BASE_FRAME, BLINK, BASE_FRAME],
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
  wake: "Reconnected. Ready when you are.",
  talk: "Din_0 is thinking...",
  jump: "Great. Let us scope your AI roadmap.",
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
