"use client";
import "client-only";

import useQuatio from "@/hooks/games/quatio/useQuatio";
import QuatioCard from "./QuatioCard";
import ScoreCard from "./ScoreCard";

export default function Quatio() {
  const {
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
    progress,
    currentScore,
    highestScore,
    currentStreak,
    highestStreak,
  } = useQuatio();

  const scores = [
    {
      label: "Current Score",
      value: currentScore,
    },
    {
      label: "Highest Score",
      value: highestScore,
    },
    {
      label: "Current Streak",
      value: currentStreak,
    },
    {
      label: "Highest Streak",
      value: highestStreak,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <QuatioCard
        {...{
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
          progress,
        }}
      />
      <ScoreCard {...{ scores }} />
    </div>
  );
}
