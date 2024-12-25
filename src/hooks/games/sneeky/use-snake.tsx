import { BOARD_SIZE, INITIAL_SPEED } from "@/data/games/sneeky/parameters";
import { DirectionKey } from "@/types/sneeky";
import { handleKeyDown } from "@/utils/sneeky/handleKeyDown";
import { useEffect, useState } from "react";

export const useSnake = () => {
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [snake, setSnake] = useState<number[][]>([
    [Math.floor(BOARD_SIZE / 2), Math.floor(BOARD_SIZE / 2)],
  ]);
  const [direction, setDirection] = useState<DirectionKey>("ArrowUp");

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) =>
      handleKeyDown(e, direction, setDirection, snake.length);

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [direction, setDirection, snake.length]);

  return { snake, setSnake, direction, setDirection, speed, setSpeed };
};
