"use client";
import "client-only";

import ScoreCard from "../score-card";
import MemourizeCard from "./memourize-card";
import { useScore } from "@/hooks/games/use-score";
import { useMemourize } from "@/hooks/games/memourize/use-memourize";

export default function Memourize() {
  const {
    currentScore,
    setCurrentScore,
    highestScore,
    currentStreak,
    setCurrentStreak,
    highestStreak,
  } = useScore({
    highestScoreLabel: "memourizeHighestScore",
    highestStreakLabel: "memourizeHighestStreak",
  });
  const {
    difficulty,
    setDifficulty,
    memourizeData,
    userAnswer,
    setUserAnswer,
    feedback,
    isCorrect,
    progress,
    setProgress,
    checkAnswer,
    handleKeyPress,
    hidden,
    timeLeft,
  } = useMemourize({
    setCurrentScore,
    setCurrentStreak,
  });

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
      <MemourizeCard
        {...{
          difficulty,
          setDifficulty,
          memourizeData,
          userAnswer,
          setUserAnswer,
          feedback,
          isCorrect,
          progress,
          setProgress,
          checkAnswer,
          handleKeyPress,
          hidden,
          timeLeft,
        }}
      />
      <ScoreCard {...{ stats }} />
    </div>
  );
}
