import {
  BOARD_SIZE,
  INITIAL_SPEED,
  APPLE_SCORE,
  GOLD_APPLE_PROBABILITY,
  GOLD_APPLE_SCORE,
} from "@/data/games/sneeky/parameters";
import { handleKeyDown } from "@/utils/sneeky/handleKeyDown";
import { isOnSnake } from "@/utils/sneeky/isOnSnake";
import { spawnApple } from "@/utils/sneeky/spawnApple";
import { spawnGoldApple } from "@/utils/sneeky/spawnGoldApple";
import { useEffect, useState } from "react";

export const useSneeky = () => {
  const [snake, setSnake] = useState<number[][]>([
    [Math.floor(BOARD_SIZE / 2), Math.floor(BOARD_SIZE / 2)],
  ]);
  const [direction, setDirection] = useState<number[]>([0, -1]); // initial direction is up
  const [apple, setApple] = useState<number[]>([
    Math.floor(Math.random() * BOARD_SIZE),
    Math.floor(Math.random() * BOARD_SIZE),
  ]);
  const [goldApple, setGoldApple] = useState<number[] | null>(null);
  const [bomb, setBomb] = useState<number[] | null>(null);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [gameOver, setGameOver] = useState(false);

  const resetGame = () => {
    setSnake([[Math.floor(BOARD_SIZE / 2), Math.floor(BOARD_SIZE / 2)]]);
    setDirection([0, -1]);
    setApple(spawnApple(snake));
    setGoldApple(null);
    setBomb(null);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameOver(false);
  };

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = newSnake[0];
        const newHead = [head[0] + direction[0], head[1] + direction[1]];

        if (
          newHead[0] < 0 ||
          newHead[0] >= BOARD_SIZE ||
          newHead[1] < 0 ||
          newHead[1] >= BOARD_SIZE ||
          isOnSnake(snake, newHead)
        ) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(newHead); // move the snake

        if (newHead[0] === apple[0] && newHead[1] === apple[1]) {
          setScore((s) => s + APPLE_SCORE);
          setApple(spawnApple(snake));

          if (Math.random() < GOLD_APPLE_PROBABILITY) {
            setGoldApple(spawnGoldApple(snake));
          }
        } else if (
          goldApple &&
          newHead[0] === goldApple[0] &&
          newHead[1] === goldApple[1]
        ) {
          setScore((s) => s + GOLD_APPLE_SCORE);
          setGoldApple(null);
        } else {
          newSnake.pop();
        }

        if (bomb && newHead[0] === bomb[0] && newHead[1] === bomb[1]) {
          setGameOver(true);
          return prevSnake;
        }

        return newSnake;
      });
    };

    const timer = setInterval(() => {
      moveSnake();
    }, speed);

    return () => clearInterval(timer);
  }, [snake, direction, apple, goldApple, bomb, gameOver, speed]);

  useEffect(() => {
    window.addEventListener("keydown", (e) =>
      handleKeyDown(e, direction, setDirection)
    );
    return () => {
      window.removeEventListener("keydown", (e) =>
        handleKeyDown(e, direction, setDirection)
      );
    };
  }, [direction]);

  return {
    snake,
    apple,
    goldApple,
    bomb,
    score,
    speed,
    gameOver,
    isOnSnake,
    resetGame,
  };
};
