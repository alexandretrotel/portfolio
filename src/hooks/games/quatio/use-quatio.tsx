import { Difficulty } from "@/types/quatio";
import { generateEquation } from "@/utils/quatio/generateEquation";
import { useEffect, useState } from "react";
import useScore from "./use-score";
import { useProgress } from "./use-progress";
import { useUser } from "./use-user";

export const FEEDBACK_DURATION = 2000;

export default function useQuatio() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [unknowns, setUnknowns] = useState(1);
  const [equationData, setEquationData] = useState(generateEquation("easy", 1));

  const {
    currentScore,
    highestScore,
    currentStreak,
    highestStreak,
    setCurrentScore,
    setCurrentStreak,
  } = useScore();
  const { updateProgress, progressValueRef } = useProgress();
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
    updateProgress,
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
    progressValueRef,
    currentScore,
    highestScore,
    currentStreak,
    highestStreak,
  };
}
