import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QuatioDifficulty } from "@/types/games/quatio";
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
  difficulty: QuatioDifficulty;
  setDifficulty: (value: QuatioDifficulty) => void;
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
    <Card className="mx-auto w-full grow">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold">
          Quatio
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            value={difficulty}
            onValueChange={(value: QuatioDifficulty) => setDifficulty(value)}
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
        {equationData?.equation && (
          <div className="space-y-2">
            <Label htmlFor="equation">Equation:</Label>
            <div
              id="equation"
              className="rounded-md bg-muted p-2 text-center text-lg font-medium"
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
              className="flex-grow [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <Button onClick={checkAnswer}>Submit</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        {feedback && (
          <div className="flex w-full flex-col gap-2">
            <div
              className={`text-center font-semibold ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback}
            </div>

            <ProgressAnswer
              value={progress}
              isCorrect={isCorrect}
              className={"w-full"}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
