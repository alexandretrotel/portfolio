import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProgressAnswer } from "@/components/ui/progress-answer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemourizeData, MemourizeDifficulty } from "@/types/memourize";
import { formatSequence } from "@/utils/memourize/formatSequence";

interface MemourizeCardProps {
  difficulty: MemourizeDifficulty;
  setDifficulty: (value: MemourizeDifficulty) => void;
  memourizeData: MemourizeData;
  userAnswer: string;
  setUserAnswer: React.Dispatch<React.SetStateAction<string>>;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  checkAnswer: () => void;
  feedback: string;
  isCorrect: boolean;
  progress: number;
  hidden: boolean;
  timeLeft: number;
}

export default function MemourizeCard({
  difficulty,
  setDifficulty,
  memourizeData,
  userAnswer,
  setUserAnswer,
  handleKeyPress,
  checkAnswer,
  feedback,
  isCorrect,
  progress,
  hidden,
  timeLeft,
}: MemourizeCardProps) {
  const sequence = hidden
    ? Array.from({ length: memourizeData.length }, () => "*").join("")
    : memourizeData;

  return (
    <Card className="w-full mx-auto grow">
      <CardHeader>
        <CardTitle>
          <h1 className="text-lg md:text-2xl font-semibold text-center">
            Memourize
          </h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            value={difficulty}
            onValueChange={(value: MemourizeDifficulty) => setDifficulty(value)}
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
          <Label htmlFor="equation">
            Sequence to memorize {timeLeft > 0 && `(${timeLeft / 1000}s)`}
          </Label>
          <div
            id="equation"
            className="text-lg font-medium text-center p-2 bg-muted rounded-md"
          >
            {formatSequence(sequence)}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="answer">Your Answer</Label>
          <div className="flex space-x-2">
            <Input
              id="answer"
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={"Enter the answer"}
              disabled={!hidden}
              className="flex-grow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Button onClick={checkAnswer} disabled={!hidden}>
              Submit
            </Button>
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
              isCorrect={isCorrect}
              className={"w-full"}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
