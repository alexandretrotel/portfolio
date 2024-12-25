import {
  BOARD_SIZE,
  DASH_BOOST,
  DASH_BOOST_DURATION,
  DASH_DELAY,
  INITIAL_SPEED,
} from "@/data/games/sneeky/parameters";
import { DirectionKey } from "@/types/sneeky";
import { handleKeyDown } from "@/utils/sneeky/handleKeyDown";
import { useCallback, useEffect, useState } from "react";

export const useSnake = () => {
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [snake, setSnake] = useState<number[][]>([
    [Math.floor(BOARD_SIZE / 2), Math.floor(BOARD_SIZE / 2)],
  ]);
  const [direction, setDirection] = useState<DirectionKey>("ArrowUp");
  const [dash, setDash] = useState(false);
  const [dashDuration, setDashDuration] = useState(0); // dash duration cooldown
  const [dashDelay, setDashDelay] = useState(false); // delay between dashes

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        return;
      }

      handleKeyDown(e, direction, setDirection, snake.length);
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [direction, setDirection, snake.length]);

  useEffect(() => {
    const handleDashKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && !dash && !dashDelay) {
        setDash(true);
        setDashDuration(DASH_BOOST_DURATION);
        setSpeed(INITIAL_SPEED - INITIAL_SPEED * (DASH_BOOST / 100));
      }
    };

    window.addEventListener("keydown", handleDashKey);
    return () => {
      window.removeEventListener("keydown", handleDashKey);
    };
  }, [dash, dashDelay]);

  useEffect(() => {
    if (dashDuration > 0) {
      const dashTimer = setInterval(() => {
        setDashDuration((prev) => prev - 10);
      }, 10);

      return () => clearInterval(dashTimer);
    } else if (dash) {
      setDash(false);
      setSpeed(INITIAL_SPEED);
      setDashDelay(true);
      setTimeout(() => setDashDelay(false), DASH_DELAY);
    }
  }, [dash, dashDuration]);

  const resetDash = useCallback(() => {
    setDash(false);
    setDashDuration(0);
    setDashDelay(false);
    setSpeed(INITIAL_SPEED);
  }, []);

  return {
    snake,
    setSnake,
    direction,
    setDirection,
    speed,
    setSpeed,
    resetDash,
    dash,
    dashDuration,
    dashDelay,
  };
};
