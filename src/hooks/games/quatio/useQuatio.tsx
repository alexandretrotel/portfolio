import { Difficulty } from "@/types/quatio";
import { generateEquation } from "@/utils/quatio/generateEquation";
import { useCallback, useEffect, useState } from "react";

export const FEEDBACK_DURATION = 2000;
const PROGRESS_SPEED = 10;

export default function useQuatio() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [unknowns, setUnknowns] = useState(1);
  const [equationData, setEquationData] = useState(generateEquation("easy", 1));
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [progress, setProgress] = useState(0);

  const newEquation = useCallback(() => {
    setEquationData(generateEquation(difficulty, unknowns));
    setUserAnswer("");
    setFeedback("");
    setIsCorrect(false);
  }, [difficulty, unknowns]);

  const checkAnswer = useCallback(() => {
    const { solution } = equationData;

    if (unknowns === 1) {
      const correct = parseFloat(userAnswer) === parseFloat(solution as string);
      setIsCorrect(correct);
      setFeedback(
        correct ? "Correct!" : `Incorrect! The correct answer is ${solution}`
      );
    } else {
      const [x, y] = userAnswer.split(",").map((val) => parseFloat(val.trim()));
      const solutionObj = solution as { x: string; y: string };
      const correct =
        x === parseFloat(solutionObj.x) && y === parseFloat(solutionObj.y);
      setIsCorrect(correct);
      setFeedback(
        correct
          ? "Correct!"
          : `Incorrect! The correct answer is (${solutionObj.x}, ${solutionObj.y})`
      );
    }

    setTimeout(() => {
      newEquation();
    }, FEEDBACK_DURATION);
  }, [equationData, unknowns, userAnswer, newEquation]);

  useEffect(() => {
    if (feedback) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 100 / (FEEDBACK_DURATION / (PROGRESS_SPEED * 2));
        });
      }, PROGRESS_SPEED);
    }
  }, [feedback]);

  useEffect(() => {
    newEquation();
  }, [difficulty, unknowns, newEquation]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        checkAnswer();
      }
    },
    [checkAnswer]
  );

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
    progress,
  };
}
