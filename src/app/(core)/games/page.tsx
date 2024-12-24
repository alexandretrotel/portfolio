import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function Games() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle>Quatio, the math game</CardTitle>
            <CardDescription>
              Quatio is a game where you have to solve equations to get the
              highest score.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href="/games/quatio">Play</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
