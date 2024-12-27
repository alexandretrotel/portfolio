import { FEEDBACK_DURATION } from "@/data/games/parameters";
import { MemourizeData, MemourizeDifficulty } from "@/types/memourize";
import { generateMemourizeData } from "@/utils/memourize/generateMemourizeData";
import { useCallback, useEffect, useState } from "react";
import { getTimeLeftFromDifficulty } from "@/utils/memourize/getTimeLeftFromDifficulty";

interface UseMemourizeProps {
  setCurrentScore: React.Dispatch<React.SetStateAction<number>>;
  setCurrentStreak: React.Dispatch<React.SetStateAction<number>>;
}

export const useMemourize = ({
  setCurrentScore,
  setCurrentStreak,
}: UseMemourizeProps) => {
  const [difficulty, setDifficulty] = useState<MemourizeDifficulty>("easy");
  const [memourizeData, setMemourizeData] = useState<MemourizeData>(
    generateMemourizeData(difficulty)
  );
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    getTimeLeftFromDifficulty(difficulty)
  );

  useEffect(() => {
    if (!memourizeData) return;

    const timer = setTimeout(() => {
      setHidden(true);
    }, getTimeLeftFromDifficulty(difficulty));

    return () => clearTimeout(timer);
  }, [difficulty, memourizeData]);

  useEffect(() => {
    if (!memourizeData) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [memourizeData]);

  const newSequence = useCallback(() => {
    setMemourizeData(generateMemourizeData(difficulty));
    setUserAnswer("");
    setFeedback("");
    setIsCorrect(false);
    setTimeLeft(getTimeLeftFromDifficulty(difficulty));
    setHidden(false);
  }, [difficulty]);

  useEffect(() => {
    if (!difficulty) return;

    newSequence();
  }, [difficulty, newSequence]);

  const checkAnswer = useCallback(() => {
    setHidden(false);

    const sequence = memourizeData;

    const correct = userAnswer === sequence;
    setIsCorrect(correct);

    if (correct) {
      setFeedback("Correct!");
      setCurrentScore((prev) => prev + 1);
      setCurrentStreak((prev) => prev + 1);
    } else {
      setFeedback("Incorrect!");
      setCurrentScore((prev) => prev - 1);
      setCurrentStreak(0);
    }

    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / FEEDBACK_DURATION) * 105, 100);
      setProgress(progress);

      if (elapsed < FEEDBACK_DURATION) {
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(0);
        newSequence();
      }
    };

    requestAnimationFrame(updateProgress);
  }, [
    memourizeData,
    newSequence,
    setCurrentScore,
    setCurrentStreak,
    userAnswer,
  ]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        checkAnswer();
      }
    },
    [checkAnswer]
  );

  return {
    difficulty,
    setDifficulty,
    memourizeData,
    setMemourizeData,
    userAnswer,
    setUserAnswer,
    feedback,
    setFeedback,
    isCorrect,
    setIsCorrect,
    progress,
    setProgress,
    checkAnswer,
    handleKeyPress,
    hidden,
    timeLeft,
  };
};
