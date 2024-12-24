"use client";
import "client-only";

import { generateEquation } from "@/utils/quatio/generateEquation";
import { useCallback, useEffect, useState } from "react";
import { Difficulty } from "@/types/quatio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Quatio() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [unknowns, setUnknowns] = useState(1);
  const [equationData, setEquationData] = useState(generateEquation("easy", 1));
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

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
    }, 2000);
  }, [equationData, unknowns, userAnswer, newEquation]);

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

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Quatio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              value={difficulty}
              onValueChange={(value: Difficulty) => setDifficulty(value)}
            >
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="unknowns">Unknowns</Label>
            <Select
              value={unknowns.toString()}
              onValueChange={(value) => setUnknowns(parseInt(value, 10))}
            >
              <SelectTrigger id="unknowns">
                <SelectValue placeholder="Select number of unknowns" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Unknown</SelectItem>
                <SelectItem value="2">2 Unknowns</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {equationData.equation && (
            <div className="space-y-2">
              <Label htmlFor="equation">Equation:</Label>
              <div
                id="equation"
                className="text-lg font-medium text-center p-2 bg-muted rounded-md"
              >
                {equationData.equation}
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="answer">Your Answer</Label>
            <div className="flex space-x-2">
              <Input
                id="answer"
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  unknowns === 1 ? "Enter x" : "Enter x, y (comma separated)"
                }
                className="flex-grow"
              />
              <Button onClick={checkAnswer}>Submit</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          {feedback && (
            <div
              className={`text-center font-semibold ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
