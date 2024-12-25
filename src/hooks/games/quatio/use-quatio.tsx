import { Difficulty } from "@/types/quatio";
import { generateEquation } from "@/utils/quatio/generateEquation";
import { useEffect, useState } from "react";
import { useScore } from "./use-score";
import { useUser } from "./use-user";

export default function useQuatio() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [unknowns, setUnknowns] = useState(1);
  const [equationData, setEquationData] = useState(generateEquation("easy", 1));
  const [progress, setProgress] = useState(0);

  const {
    currentScore,
    highestScore,
    currentStreak,
    highestStreak,
    setCurrentScore,
    setCurrentStreak,
  } = useScore();
  const {
    userAnswer,
    setUserAnswer,
    feedback,
    isCorrect,
    checkAnswer,
    handleKeyPress,
    newEquation,
  } = useUser({
    difficulty,
    unknowns,
    equationData,
    setEquationData,
    setCurrentScore,
    setCurrentStreak,
    setProgress,
  });

  useEffect(() => {
    newEquation();
  }, [difficulty, newEquation, unknowns]);

  return {
    difficulty,
    setDifficulty,
    unknowns,
    setUnknowns,
    equationData,
    userAnswer,
    setUserAnswer,
    feedback,
    isCorrect,
    checkAnswer,
    handleKeyPress,
    currentScore,
    highestScore,
    currentStreak,
    highestStreak,
    progress,
  };
}
