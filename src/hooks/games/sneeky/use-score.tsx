import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCallback, useEffect, useState } from "react";

export const useScore = () => {
  const [score, setScore] = useState(0);

  const [highestScore, setHighestScore] = useLocalStorage(
    "sneekyHighestScore",
    0
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialHighestScore = localStorage.getItem("sneekyHighestScore");

      setHighestScore(
        initialHighestScore ? parseInt(initialHighestScore, 10) : 0
      );
    }
  }, [setHighestScore]);

  useEffect(() => {
    if (score > parseFloat(highestScore.toString())) {
      setHighestScore(score);
    }
  }, [highestScore, score, setHighestScore]);

  const resetScore = useCallback(() => {
    setScore(0);
  }, [setScore]);

  return { score, setScore, highestScore, setHighestScore, resetScore };
};
