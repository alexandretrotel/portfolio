import { useLocalStorage } from "@/hooks/use-local-storage";
import { useState, useEffect } from "react";

export function useScore() {
  const [currentScore, setCurrentScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  const [storedHighestScore, setStoredHighestScore] = useLocalStorage(
    "quatioHighestScore",
    0
  );
  const [storedHighestStreak, setStoredHighestStreak] = useLocalStorage(
    "quatioHighestStreak",
    0
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialHighestScore = localStorage.getItem("quatioHighestScore");
      const initialHighestStreak = localStorage.getItem("quatioHighestStreak");

      setStoredHighestScore(
        initialHighestScore ? parseInt(initialHighestScore, 10) : 0
      );
      setStoredHighestStreak(
        initialHighestStreak ? parseInt(initialHighestStreak, 10) : 0
      );
    }
  }, [setStoredHighestScore, setStoredHighestStreak]);

  useEffect(() => {
    if (currentScore > parseFloat(storedHighestScore.toString())) {
      setStoredHighestScore(currentScore);
    }
    if (currentStreak > parseFloat(storedHighestStreak.toString())) {
      setStoredHighestStreak(currentStreak);
    }
  }, [
    currentScore,
    currentStreak,
    setStoredHighestScore,
    setStoredHighestStreak,
    storedHighestScore,
    storedHighestStreak,
  ]);

  return {
    currentScore,
    setCurrentScore,
    highestScore: storedHighestScore,
    currentStreak,
    setCurrentStreak,
    highestStreak: storedHighestStreak,
  };
}
