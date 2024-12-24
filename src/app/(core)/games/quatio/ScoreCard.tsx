import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScoreCardProps {
  scores: {
    label: string;
    value: string | number;
  }[];
}

export default function ScoreCard({ scores }: ScoreCardProps) {
  return (
    <Card className="md:max-w-sm w-full mx-auto grow h-fit">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Score</CardTitle>
      </CardHeader>
      <CardContent>
        {scores.map((score, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-sm">{score.label}:</span>
            <span className="font-semibold">{score.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
