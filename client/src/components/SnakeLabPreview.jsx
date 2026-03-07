import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const COLUMNS = 12;
const ROWS = 6;
const START_SNAKE = [
  { x: 3, y: 3 },
  { x: 2, y: 3 },
  { x: 1, y: 3 },
];
const START_DIRECTION = { x: 1, y: 0 };
const DIRECTIONS = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

function randomFood(snake) {
  const taken = new Set(snake.map((segment) => `${segment.x}:${segment.y}`));
  let food = { x: 0, y: 0 };

  do {
    food = {
      x: Math.floor(Math.random() * COLUMNS),
      y: Math.floor(Math.random() * ROWS),
    };
  } while (taken.has(`${food.x}:${food.y}`));

  return food;
}

function samePoint(a, b) {
  return a.x === b.x && a.y === b.y;
}

function nextDirection(head, direction) {
  const target = { x: head.x + direction.x, y: head.y + direction.y };
  const inBounds = target.x >= 0 && target.x < COLUMNS && target.y >= 0 && target.y < ROWS;

  if (inBounds) {
    return direction;
  }

  const currentIndex = DIRECTIONS.findIndex((item) => item.x === direction.x && item.y === direction.y);
  return DIRECTIONS[(currentIndex + 1) % DIRECTIONS.length];
}

export default function SnakeLabPreview() {
  const [snake, setSnake] = useState(START_SNAKE);
  const [direction, setDirection] = useState(START_DIRECTION);
  const [food, setFood] = useState(() => randomFood(START_SNAKE));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSnake((currentSnake) => {
        const currentDirection = nextDirection(currentSnake[0], direction);
        if (currentDirection !== direction) {
          setDirection(currentDirection);
        }

        const head = currentSnake[0];
        const nextHead = {
          x: head.x + currentDirection.x,
          y: head.y + currentDirection.y,
        };

        const hitBoundary = nextHead.x < 0 || nextHead.x >= COLUMNS || nextHead.y < 0 || nextHead.y >= ROWS;
        const hitSelf = currentSnake.some((segment) => samePoint(segment, nextHead));

        if (hitBoundary || hitSelf) {
          setDirection(START_DIRECTION);
          setFood(randomFood(START_SNAKE));
          return START_SNAKE;
        }

        const ateFood = samePoint(nextHead, food);
        const nextSnake = [nextHead, ...currentSnake];

        if (!ateFood) {
          nextSnake.pop();
        } else {
          setFood(randomFood(nextSnake));
        }

        return nextSnake;
      });
    }, 280);

    return () => window.clearInterval(timer);
  }, [direction, food]);

  const cells = useMemo(() => {
    const snakeMap = new Map(snake.map((segment, index) => [`${segment.x}:${segment.y}`, index]));

    return Array.from({ length: COLUMNS * ROWS }, (_, index) => {
      const x = index % COLUMNS;
      const y = Math.floor(index / COLUMNS);
      const key = `${x}:${y}`;
      const snakeIndex = snakeMap.get(key);
      return {
        key,
        isSnake: snakeIndex !== undefined,
        isHead: snakeIndex === 0,
        isFood: food.x === x && food.y === y,
      };
    });
  }, [food, snake]);

  return (
    <div className="snake-preview-block">
      <Link to="/tools/snake-lab" className="snake-preview-card" aria-label="Open Snake Lab">
        <div className="snake-preview-board" aria-hidden="true">
          {cells.map((cell) => (
            <span
              key={cell.key}
              className={[
                "snake-preview-cell",
                cell.isSnake ? "snake" : "",
                cell.isHead ? "head" : "",
                cell.isFood ? "food" : "",
              ].join(" ")}
            />
          ))}
        </div>
      </Link>
      <Link to="/tools/snake-lab" className="btn btn-secondary snake-preview-cta">
        Open Snake Lab
      </Link>
    </div>
  );
}
