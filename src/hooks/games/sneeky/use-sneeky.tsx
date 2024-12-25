import { BOARD_SIZE } from "@/data/games/sneeky/parameters";
import { isOnSnake } from "@/utils/sneeky/isOnSnake";
import { useCallback, useEffect } from "react";
import { useScore } from "../sneeky/use-score";
import { useSnake } from "./use-snake";
import { useGameItems } from "./use-game-items";
import { useGameState } from "./use-game-state";
import { directionMap } from "@/types/sneeky";
import { isOutOfBonds } from "@/utils/sneeky/isOutOfBonds";

export const useSneeky = () => {
  const { snake, setSnake, speed, setSpeed, direction, setDirection } =
    useSnake();
  const { score, setScore, highestScore, resetScore } = useScore();
  const { activeItems, resetItems, handleItemCollisions } = useGameItems({
    snake,
    setSnake,
    speed,
    setScore,
  });
  const {
    gameOver,
    setGameOver,
    resetGameState,
    startTime,
    endTime,
    duration,
    init,
    setInit,
  } = useGameState({ snake, setSpeed });

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = newSnake[0];

      const newHead = [
        head[0] - directionMap[direction][1],
        head[1] + directionMap[direction][0],
      ];

      if (
        isOutOfBonds(newHead, BOARD_SIZE) ||
        isOnSnake(newSnake.slice(1), newHead)
      ) {
        setGameOver(true);
        return prevSnake;
      }

      handleItemCollisions(newHead);

      newSnake.unshift(newHead);
      newSnake.pop();

      return newSnake;
    });
  }, [direction, handleItemCollisions, setGameOver, setSnake]);

  useEffect(() => {
    if (gameOver || init) return;

    const timer = setInterval(() => {
      moveSnake();
    }, speed);

    return () => clearInterval(timer);
  }, [init, snake, speed, gameOver, activeItems, moveSnake]);

  const resetGame = useCallback(() => {
    setSnake([[Math.floor(BOARD_SIZE / 2), Math.floor(BOARD_SIZE / 2)]]);
    setDirection("ArrowUp");

    resetGameState();
    resetScore();
    resetItems();
  }, [resetGameState, resetItems, resetScore, setDirection, setSnake]);

  useEffect(() => {
    if (gameOver) {
      resetGame();
    }
  }, [gameOver, resetGame]);

  return {
    snake,
    score,
    speed,
    gameOver,
    setGameOver,
    isOnSnake,
    resetGame,
    activeItems,
    startTime,
    endTime,
    init,
    setInit,
    duration,
    highestScore,
  };
};
