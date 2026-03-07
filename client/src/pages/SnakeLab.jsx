import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";

const GRID_COLUMNS = 24;
const GRID_ROWS = 10;
const BASE_SPEED = 240;
const MIN_SPEED = 150;
const SPEED_STEP = 5;
const MANUAL_CONTROL_MS = 3400;

const initialSnake = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 },
];

const initialDirection = { x: 1, y: 0 };

const directionalButtons = [
  { label: "Up", keys: ["ArrowUp", "w", "W"], vector: { x: 0, y: -1 } },
  { label: "Left", keys: ["ArrowLeft", "a", "A"], vector: { x: -1, y: 0 } },
  { label: "Right", keys: ["ArrowRight", "d", "D"], vector: { x: 1, y: 0 } },
  { label: "Down", keys: ["ArrowDown", "s", "S"], vector: { x: 0, y: 1 } },
];

function getRandomFood(snake) {
  const occupied = new Set(snake.map((segment) => `${segment.x}:${segment.y}`));
  let nextFood = { x: 0, y: 0 };

  do {
    nextFood = {
      x: Math.floor(Math.random() * GRID_COLUMNS),
      y: Math.floor(Math.random() * GRID_ROWS),
    };
  } while (occupied.has(`${nextFood.x}:${nextFood.y}`));

  return nextFood;
}

function isOpposite(current, next) {
  return current.x + next.x === 0 && current.y + next.y === 0;
}

function wouldCollide(nextHead, snake) {
  return snake.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y);
}

function inBounds(point) {
  return point.x >= 0 && point.x < GRID_COLUMNS && point.y >= 0 && point.y < GRID_ROWS;
}

function chooseAutopilotDirection(snake, currentDirection, food) {
  const head = snake[0];
  const candidates = directionalButtons
    .map((button) => button.vector)
    .filter((vector) => !isOpposite(currentDirection, vector))
    .map((vector) => ({
      vector,
      nextHead: { x: head.x + vector.x, y: head.y + vector.y },
    }))
    .filter(({ nextHead }) => inBounds(nextHead) && !wouldCollide(nextHead, snake.slice(0, -1)));

  if (candidates.length === 0) {
    return currentDirection;
  }

  candidates.sort((a, b) => {
    const distanceA = Math.abs(a.nextHead.x - food.x) + Math.abs(a.nextHead.y - food.y);
    const distanceB = Math.abs(b.nextHead.x - food.x) + Math.abs(b.nextHead.y - food.y);
    return distanceA - distanceB;
  });

  return candidates[0].vector;
}

export default function SnakeLab() {
  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState(initialDirection);
  const [food, setFood] = useState(() => getRandomFood(initialSnake));
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("running");
  const [controlMode, setControlMode] = useState("auto");
  const [boardActive, setBoardActive] = useState(false);
  const [highScore, setHighScore] = useState(() => Number(window.localStorage.getItem("snake_lab_high_score") || "0"));
  const directionRef = useRef(initialDirection);
  const manualUntilRef = useRef(0);
  const controlModeRef = useRef("auto");
  const boardRef = useRef(null);

  const speed = Math.max(MIN_SPEED, BASE_SPEED - score * SPEED_STEP);

  const statusCopy = {
    ready: "Autopilot is active. Take control whenever you want to test your own routing.",
    running:
      controlMode === "manual"
        ? "Manual control is live. Hover the board and use arrow keys or WASD while the snake turns gold."
        : "Autopilot is active. Hover the board and take over at any time. The snake stays compact and green while it self-routes.",
    paused: "Pause gives you time to re-plan the route before the next turn.",
    gameover: "Collision usually means the loop outran the plan. Reset and try again.",
  };

  const lessons = [
    "Why it matters: good AI operations depend on fast feedback loops and controlled decision speed.",
    "What it models: queue discipline, route planning, latency under pressure, and avoiding self-inflicted collisions.",
    "Best use: a 90-second workshop warm-up before discussing automation scope, routing logic, or handoff design.",
  ];

  const handleDirection = useCallback((nextDirection) => {
    setStatus("running");

    if (isOpposite(directionRef.current, nextDirection)) {
      return;
    }

    manualUntilRef.current = Date.now() + MANUAL_CONTROL_MS;
    controlModeRef.current = "manual";
    setControlMode("manual");
    directionRef.current = nextDirection;
    setDirection(nextDirection);
  }, []);

  const resetGame = useCallback(() => {
    directionRef.current = initialDirection;
    setSnake(initialSnake);
    setDirection(initialDirection);
    setFood(getRandomFood(initialSnake));
    setScore(0);
    manualUntilRef.current = 0;
    controlModeRef.current = "auto";
    setControlMode("auto");
    setStatus("running");
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        setStatus((current) => (current === "running" ? "paused" : "running"));
        return;
      }

      const match = directionalButtons.find((item) => item.keys.includes(event.key));
      if (!match) {
        return;
      }

      event.preventDefault();
      handleDirection(match.vector);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleDirection]);

  useEffect(() => {
    if (status !== "running") {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setSnake((currentSnake) => {
        const autopilot = Date.now() > manualUntilRef.current;
        if (autopilot && controlModeRef.current !== "auto") {
          controlModeRef.current = "auto";
          setControlMode("auto");
        }

        const activeDirection = autopilot
          ? chooseAutopilotDirection(currentSnake, directionRef.current, food)
          : directionRef.current;

        directionRef.current = activeDirection;
        setDirection(activeDirection);

        const head = currentSnake[0];
        const nextHead = {
          x: head.x + activeDirection.x,
          y: head.y + activeDirection.y,
        };

        const hitWall =
          nextHead.x < 0 ||
          nextHead.x >= GRID_COLUMNS ||
          nextHead.y < 0 ||
          nextHead.y >= GRID_ROWS;

        const hitSelf = currentSnake.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y);

        if (hitWall || hitSelf) {
          if (autopilot) {
            const resetSnake = initialSnake.map((segment) => ({ ...segment }));
            directionRef.current = initialDirection;
            setDirection(initialDirection);
            setFood(getRandomFood(resetSnake));
            setScore(0);
            return resetSnake;
          }
          setStatus("gameover");
          return currentSnake;
        }

        const ateFood = nextHead.x === food.x && nextHead.y === food.y;
        const nextSnake = [nextHead, ...currentSnake];

        if (!ateFood) {
          nextSnake.pop();
        } else {
          const nextScore = currentSnake.length - 2;
          setScore(nextScore);
          setHighScore((currentHighScore) => {
            const updated = Math.max(currentHighScore, nextScore);
            window.localStorage.setItem("snake_lab_high_score", String(updated));
            return updated;
          });
          setFood(getRandomFood(nextSnake));
        }

        return nextSnake;
      });
    }, speed);

    return () => window.clearInterval(timer);
  }, [food.x, food.y, speed, status]);

  const cells = useMemo(() => {
    const snakeMap = new Map(snake.map((segment, index) => [`${segment.x}:${segment.y}`, index]));

    return Array.from({ length: GRID_COLUMNS * GRID_ROWS }, (_, index) => {
      const x = index % GRID_COLUMNS;
      const y = Math.floor(index / GRID_COLUMNS);
      const key = `${x}:${y}`;
      const snakeIndex = snakeMap.get(key);
      const isFood = food.x === x && food.y === y;

      return {
        key,
        isFood,
        isSnake: snakeIndex !== undefined,
        isHead: snakeIndex === 0,
      };
    });
  }, [food.x, food.y, snake]);

  return (
    <main>
      <Seo
        title="Snake Lab | Aethos AI"
        description="A short operational feedback-loop exercise for teams exploring AI automation, routing logic, and decision speed."
      />

      <ScrollRevealSection className="section snake-top-section">
        <div className="container snake-layout">
          <section className="surface-card snake-card snake-card-playfield">
            <div className="snake-card-header">
              <div>
                <p className="eyebrow">Tools / Snake Lab</p>
                <h2>Control the loop</h2>
              </div>
              <div className="snake-stats">
                <span>Apples: {score}</span>
                <span>Best: {highScore}</span>
                <span>Tick: {speed}ms</span>
                <span>Mode: {controlMode === "manual" ? "Manual" : "Autopilot"}</span>
              </div>
            </div>

            <p className="muted snake-status-copy">{statusCopy[status]}</p>

            <div
              ref={boardRef}
              className={`snake-board ${controlMode === "manual" ? "manual" : "auto"} ${boardActive ? "engaged" : ""}`}
              role="application"
              aria-label="Snake game board"
              tabIndex={0}
              onMouseEnter={() => {
                setBoardActive(true);
                boardRef.current?.focus();
              }}
              onMouseLeave={() => setBoardActive(false)}
              onFocus={() => setBoardActive(true)}
              onBlur={() => setBoardActive(false)}
            >
              {cells.map((cell) => (
                <span
                  key={cell.key}
                  className={[
                    "snake-cell",
                    cell.isSnake ? "snake" : "",
                    cell.isHead ? "head" : "",
                    cell.isFood ? "food" : "",
                  ].join(" ")}
                />
              ))}
            </div>

            <div className="snake-toolbar">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setStatus((current) => (current === "running" ? "paused" : "running"))}
              >
                {status === "running" ? "Pause board" : status === "paused" ? "Resume board" : "Start board"}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetGame}>
                Reset
              </button>
            </div>

            <p className="small muted">
              Hover the board, then use arrow keys or WASD. Press space to pause. The pacing is deliberately slower so you have time to redirect the snake before each turn.
            </p>

            <div className="snake-control-pad" aria-label="Snake controls">
              <button type="button" className="chip-button snake-control up" onClick={() => handleDirection({ x: 0, y: -1 })}>
                ↑
              </button>
              <button type="button" className="chip-button snake-control left" onClick={() => handleDirection({ x: -1, y: 0 })}>
                ←
              </button>
              <button type="button" className="chip-button snake-control right" onClick={() => handleDirection({ x: 1, y: 0 })}>
                →
              </button>
              <button type="button" className="chip-button snake-control down" onClick={() => handleDirection({ x: 0, y: 1 })}>
                ↓
              </button>
            </div>
          </section>

          <aside className="snake-side-stack">
            <div className="surface-card snake-insight-card">
              <h2>What the exercise teaches</h2>
              <div className="snake-lesson-list">
                {lessons.map((lesson) => (
                  <p key={lesson} className="muted">
                    {lesson}
                  </p>
                ))}
              </div>
            </div>

            <div className="surface-card snake-insight-card">
              <h3>Translate the game into a real workflow discussion</h3>
              <ul className="content-list compact">
                <li>Where does your team collide with the same issue repeatedly?</li>
                <li>Which requests should be routed instantly instead of queued manually?</li>
                <li>What guardrail would stop a wrong turn before it becomes rework?</li>
              </ul>
              <div className="snake-next-links">
                <Link className="btn btn-secondary" to="/ai-roi-calculator">
                  Estimate ROI
                </Link>
                <Link className="btn btn-primary" to="/book">
                  Get Your AI Opportunity Assessment
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt booking-intro">
        <div className="container snake-page-intro">
          <div>
            <p className="eyebrow">Why Snake belongs here</p>
            <h1>Snake, reframed as a live feedback-loop exercise for AI operations.</h1>
            <p className="hero-copy muted">
              This page is not here as a novelty. It is a simple way to make routing,
              constraint-management, and throughput pressure tangible before talking about AI agents,
              workflow automation, or queue design.
            </p>
            <div className="page-intro-block">
              <p>
                Teams evaluating AI systems often understand the business goal but underestimate the
                execution loop: input arrives, routing decisions happen, latency accumulates, and
                weak handoffs create avoidable collisions. Snake is a compact metaphor for that loop.
              </p>
              <ul className="content-list">
                <li>Use it as a 90-second workshop warm-up before scoping an automation pilot.</li>
                <li>Relate score growth to throughput, and collisions to poor routing or missing guardrails.</li>
                <li>Use the follow-up links to move from the exercise into real ROI or implementation planning.</li>
              </ul>
            </div>
          </div>

          <aside className="surface-card snake-purpose-card">
            <h2>Why this belongs on an AI consulting site</h2>
            <p className="muted">
              High-performing automation systems are not only about model quality. They depend on
              controlled feedback loops, clear next actions, and fast recovery when a route fails.
            </p>
            <div className="snake-purpose-metrics">
              <div>
                <strong>1 loop</strong>
                <span>Signal → route → act → recover</span>
              </div>
              <div>
                <strong>90 sec</strong>
                <span>Good warm-up before discussing workflow design</span>
              </div>
              <div>
                <strong>Practical</strong>
                <span>Useful metaphor for ops teams, founders, and service leaders</span>
              </div>
            </div>
          </aside>
        </div>
      </ScrollRevealSection>
    </main>
  );
}
