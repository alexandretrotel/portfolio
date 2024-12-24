"use client";
import "client-only";

import React from "react";
import useQuatio from "@/hooks/games/quatio/use-quatio";
import QuatioCard from "./quatio-card";
import ScoreCard from "./score-card";

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
    currentScore,
    highestScore,
    currentStreak,
    highestStreak,
    progress,
  } = useQuatio();

  const stats = {
    scores: {
      title: "Score",
      values: [
        {
          label: "Current Score",
          value: currentScore,
        },
        {
          label: "Highest Score",
          value: highestScore,
        },
      ],
    },
    streaks: {
      title: "Streak",
      values: [
        {
          label: "Current Streak",
          value: currentStreak,
        },
        {
          label: "Highest Streak",
          value: highestStreak,
        },
      ],
    },
  };
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
      <ScoreCard {...{ stats }} />
    </div>
  );
}
