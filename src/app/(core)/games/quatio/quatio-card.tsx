import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Difficulty } from "@/types/quatio";
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
import { ProgressAnswer } from "@/components/ui/progress-answer";

interface QuatioCardProps {
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
  unknowns: number;
  setUnknowns: (value: number) => void;
  equationData: {
    equation: string;
  };
  userAnswer: string;
  setUserAnswer: (value: string) => void;
  feedback: string;
  isCorrect: boolean;
  checkAnswer: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  progress: number;
}

export default function QuatioCard({
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
}: QuatioCardProps) {
  return (
    <Card className="w-full mx-auto grow">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Quatio</CardTitle>
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
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={
                unknowns === 1 ? "Enter x" : "Enter x, y (comma separated)"
              }
              className="flex-grow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Button onClick={checkAnswer}>Submit</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        {feedback && (
          <div className="flex flex-col gap-2 w-full">
            <div
              className={`text-center font-semibold ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback}
            </div>

            <ProgressAnswer
              value={progress}
              max={100}
              isCorrect={isCorrect}
              className={"w-full"}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
