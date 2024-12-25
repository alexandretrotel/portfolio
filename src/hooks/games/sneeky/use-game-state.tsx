import { INITIAL_SPEED } from "@/data/games/sneeky/parameters";
import { useCallback, useEffect, useState } from "react";

interface GameStateProps {
  snake: number[][];
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
}

export const useGameState = ({ setSpeed }: GameStateProps) => {
  const [gameOver, setGameOver] = useState(false);
  const [init, setInit] = useState(true);

  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (gameOver) {
      setEndTime(new Date());
    }
  }, [gameOver]);

  useEffect(() => {
    if (!init) {
      const timer = setInterval(() => setDuration((d) => d + 1), 1000);
      return () => clearInterval(timer);
    }

    if (gameOver) {
      setDuration(0);
    }
  }, [init, gameOver, setDuration]);

  const resetGameState = useCallback(() => {
    setSpeed(INITIAL_SPEED);
    setStartTime(new Date());
    setEndTime(null);
    setDuration(0);
  }, [setSpeed]);

  return {
    gameOver,
    setGameOver,
    init,
    setInit,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    duration,
    setDuration,
    resetGameState,
  };
};
