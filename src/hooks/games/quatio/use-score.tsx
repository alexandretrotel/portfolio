import { useState, useCallback, useEffect } from "react";

const useLocalStorage = (key: string, initialValue: number) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      return storedValue ? parseInt(storedValue, 10) : initialValue;
    }
    return initialValue;
  });

  const updateValue = useCallback(
    (newValue: number) => {
      setValue(newValue);
      if (typeof window !== "undefined") {
        localStorage.setItem(key, newValue.toString());
      }
    },
    [key]
  );

  return [value, updateValue] as const;
};

export default function useScore() {
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
