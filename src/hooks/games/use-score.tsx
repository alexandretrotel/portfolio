import { useLocalStorage } from "@/hooks/use-local-storage";
import { useState, useEffect } from "react";

interface UseScoreProps {
  highestScoreLabel: string;
  highestStreakLabel: string;
}

export function useScore({
  highestScoreLabel,
  highestStreakLabel,
}: UseScoreProps) {
  const [currentScore, setCurrentScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  const [storedHighestScore, setStoredHighestScore] = useLocalStorage(
    highestScoreLabel,
    0
  );
  const [storedHighestStreak, setStoredHighestStreak] = useLocalStorage(
    highestStreakLabel,
    0
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialHighestScore = localStorage.getItem(highestScoreLabel);
      const initialHighestStreak = localStorage.getItem(highestStreakLabel);

      setStoredHighestScore(
        initialHighestScore ? parseInt(initialHighestScore, 10) : 0
      );
      setStoredHighestStreak(
        initialHighestStreak ? parseInt(initialHighestStreak, 10) : 0
      );
    }
  }, [
    highestScoreLabel,
    highestStreakLabel,
    setStoredHighestScore,
    setStoredHighestStreak,
  ]);

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
