import {
  BOARD_SIZE,
  INITIAL_SPEED,
  APPLE_SCORE,
  GOLD_APPLE_PROBABILITY,
  GOLD_APPLE_SCORE,
  BOMB_DURATION,
  BOMB_PROBABILITY,
  CUT_PROBABILITY,
  CUT_DURATION,
} from "@/data/games/sneeky/parameters";
import { DirectionKey, directionMap, Item } from "@/types/sneeky";
import { checkCollision } from "@/utils/sneeky/checkCollision";
import { handleKeyDown } from "@/utils/sneeky/handleKeyDown";
import { isOnSnake } from "@/utils/sneeky/isOnSnake";
import { spawnItem } from "@/utils/sneeky/spawnItem";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useSneeky = () => {
  const [snake, setSnake] = useState<number[][]>([
    [Math.floor(BOARD_SIZE / 2), Math.floor(BOARD_SIZE / 2)],
  ]);
  const [direction, setDirection] = useState<DirectionKey>("ArrowUp");
  const [apple, setApple] = useState<number[]>([
    Math.floor(Math.random() * BOARD_SIZE),
    Math.floor(Math.random() * BOARD_SIZE),
  ]);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [gameOver, setGameOver] = useState(false);
  const [init, setInit] = useState(true);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [activeItems, setActiveItems] = useState<
    { type: Item; position: number[]; expiration: number }[]
  >([]);
  const [canSpawnItems, setCanSpawnItems] = useState<
    { type: Item; canSpawn: boolean; delay: number }[]
  >([
    { type: "bomb", canSpawn: false, delay: 10000 },
    { type: "cut", canSpawn: false, delay: 15000 },
    { type: "goldApple", canSpawn: false, delay: 5000 },
  ]);
  const [duration, setDuration] = useState<number>(0);

  const activeItemPositions = useMemo(
    () => activeItems.map((item) => item.position),
    [activeItems]
  );

  const resetGame = useCallback(() => {
    setSnake([[Math.floor(BOARD_SIZE / 2), Math.floor(BOARD_SIZE / 2)]]);
    setDirection("ArrowUp");
    setApple(spawnItem(snake, activeItemPositions));
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameOver(false);

    setStartTime(new Date());
    setEndTime(null);
    setDuration(0);

    setCanSpawnItems((prev) =>
      prev.map((item) => ({ ...item, canSpawn: false }))
    );
    setActiveItems([]);
  }, [activeItemPositions, snake]);

  const handleItemEffect = (item: { type: Item; position: number[] }) => {
    switch (item.type) {
      case "goldApple":
        setScore((s) => s + GOLD_APPLE_SCORE);
        setSnake((prev) => [...prev, ...Array(3).fill(prev[prev.length - 1])]);
        break;
      case "cut":
        setSnake((prev) => prev.slice(0, -1));
        break;
      case "bomb":
        setGameOver(true);
        break;
    }

    setActiveItems((prev) => prev.filter((i) => i !== item));
  };

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = newSnake[0];

      const newHead = [
        head[0] - directionMap[direction][1],
        head[1] + directionMap[direction][0],
      ];

      if (
        newHead[0] < 0 ||
        newHead[0] >= BOARD_SIZE ||
        newHead[1] < 0 ||
        newHead[1] >= BOARD_SIZE
      ) {
        setGameOver(true);
        return prevSnake;
      }

      if (isOnSnake(newSnake.slice(1), newHead)) {
        setGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(newHead); // move the snake

      if (checkCollision(newHead, apple)) {
        setScore((s) => s + APPLE_SCORE);
        setApple(spawnItem(snake, activeItemPositions));

        if (
          Math.random() < GOLD_APPLE_PROBABILITY &&
          !activeItems.some((item) => item.type === "goldApple") &&
          canSpawnItems.find((item) => item.type === "goldApple")?.canSpawn
        ) {
          setActiveItems((prevItems) => [
            ...prevItems,
            {
              type: "goldApple",
              position: spawnItem(snake, activeItemPositions),
              expiration: Infinity,
            },
          ]);
        }
      } else {
        newSnake.pop();
      }

      // active items collision
      activeItems.forEach((item) => {
        if (checkCollision(newHead, item.position)) {
          handleItemEffect(item);
        }
      });

      return newSnake;
    });
  }, [
    snake,
    direction,
    apple,
    activeItems,
    activeItemPositions,
    canSpawnItems,
  ]);

  useEffect(() => {
    if (gameOver || init) return;

    const timer = setInterval(moveSnake, speed);
    return () => clearInterval(timer);
  }, [snake, direction, speed, gameOver, activeItems, moveSnake]);

  useEffect(() => {
    if (gameOver) {
      setEndTime(new Date());
    }
  }, [gameOver]);

  useEffect(() => {
    const timers = canSpawnItems.map(({ type, delay }) =>
      setTimeout(() => {
        setCanSpawnItems((prev) =>
          prev.map((item) =>
            item.type === type ? { ...item, canSpawn: true } : item
          )
        );
      }, delay)
    );

    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, [canSpawnItems]);

  useEffect(() => {
    const now = Date.now();

    setActiveItems((prev) => {
      const newItems = prev.filter((item) => item.expiration > now);

      if (
        Math.random() < BOMB_PROBABILITY &&
        !newItems.some((item) => item.type === "bomb") &&
        canSpawnItems.find((item) => item.type === "bomb")?.canSpawn
      ) {
        newItems.push({
          type: "bomb",
          position: spawnItem(
            snake,
            newItems.map((item) => item.position)
          ),
          expiration: now + BOMB_DURATION,
        });
      }

      if (
        Math.random() < CUT_PROBABILITY &&
        !newItems.some((item) => item.type === "cut") &&
        canSpawnItems.find((item) => item.type === "cut")?.canSpawn &&
        snake.length >= 5
      ) {
        newItems.push({
          type: "cut",
          position: spawnItem(
            snake,
            newItems.map((item) => item.position)
          ),
          expiration: now + CUT_DURATION,
        });
      }

      if (
        Math.random() < GOLD_APPLE_PROBABILITY &&
        !newItems.some((item) => item.type === "goldApple") &&
        canSpawnItems.find((item) => item.type === "goldApple")?.canSpawn
      ) {
        newItems.push({
          type: "goldApple",
          position: spawnItem(
            snake,
            newItems.map((item) => item.position)
          ),
          expiration: Infinity,
        });
      }

      return newItems;
    });
  }, [snake, canSpawnItems]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) =>
      handleKeyDown(e, direction, setDirection);

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [direction]);

  useEffect(() => {
    const highestScore = parseInt(
      localStorage.getItem("sneekyHighestScore") ?? "0"
    );
    if (score > highestScore) {
      localStorage.setItem("sneekyHighestScore", score.toString());
    }
  }, [score]);

  useEffect(() => {
    if (!init) {
      const timer = setInterval(() => setDuration((d) => d + 1), 1000);
      return () => clearInterval(timer);
    }

    if (gameOver) {
      setDuration(0);
    }
  }, [init, gameOver]);

  return {
    snake,
    apple,
    score,
    speed,
    gameOver,
    isOnSnake,
    resetGame,
    activeItems,
    startTime,
    endTime,
    init,
    setInit,
    duration,
  };
};
