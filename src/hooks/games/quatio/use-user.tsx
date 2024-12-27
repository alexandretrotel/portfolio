import { generateEquation } from "@/utils/quatio/generateEquation";
import { useCallback, useState } from "react";
import { QuatioDifficulty } from "@/types/quatio";
import { FEEDBACK_DURATION } from "@/data/games/parameters";

type SetEquationDataType = React.Dispatch<
  React.SetStateAction<
    | {
        equation: string;
        solution: string;
      }
    | {
        equation: string;
        solution: {
          x: string;
          y: string;
        };
      }
  >
>;

interface UserProps {
  difficulty: QuatioDifficulty;
  unknowns: number;
  equationData: {
    equation: string;
    solution: string | { x: string; y: string };
  };
  setEquationData: SetEquationDataType;
  setCurrentScore: React.Dispatch<React.SetStateAction<number>>;
  setCurrentStreak: React.Dispatch<React.SetStateAction<number>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

export const useUser = ({
  difficulty,
  unknowns,
  equationData,
  setEquationData,
  setCurrentScore,
  setCurrentStreak,
  setProgress,
}: UserProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const newEquation = useCallback(() => {
    setEquationData(generateEquation(difficulty, unknowns));
    setUserAnswer("");
    setFeedback("");
    setIsCorrect(false);
  }, [difficulty, setEquationData, unknowns]);

  const checkAnswer = useCallback(() => {
    const { solution } = equationData;

    if (unknowns === 1) {
      const correct = parseFloat(userAnswer) === parseFloat(solution as string);
      setIsCorrect(correct);
      if (correct) {
        setFeedback("Correct!");
        setCurrentScore((prev) => (correct ? prev + 10 : prev));
        setCurrentStreak((prev) => prev + 1);
      } else {
        setFeedback(`Incorrect! The correct answer is ${solution}`);
        setCurrentScore((prev) => (correct ? prev - 5 : prev));
        setCurrentStreak(0);
      }
    } else {
      const [x, y] = userAnswer.split(",").map((val) => parseFloat(val.trim()));
      const solutionObj = solution as { x: string; y: string };
      const correct =
        x === parseFloat(solutionObj.x) && y === parseFloat(solutionObj.y);
      setIsCorrect(correct);

      if (correct) {
        setFeedback("Correct!");
        setCurrentScore((prev) => (correct ? prev + 20 : prev));
        setCurrentStreak((prev) => prev + 1);
      } else {
        setFeedback(
          `Incorrect! The correct answer is x = ${solutionObj.x}, y = ${solutionObj.y}`
        );
        setCurrentScore((prev) => (correct ? prev - 10 : prev));
        setCurrentStreak(0);
      }
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
        newEquation();
      }
    };

    requestAnimationFrame(updateProgress);
  }, [
    equationData,
    unknowns,
    userAnswer,
    setCurrentScore,
    setCurrentStreak,
    setProgress,
    newEquation,
  ]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        checkAnswer();
      }
    },
    [checkAnswer]
  );

  return {
    userAnswer,
    setUserAnswer,
    feedback,
    isCorrect,
    checkAnswer,
    handleKeyPress,
    newEquation,
  };
};
