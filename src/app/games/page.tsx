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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle>Quatio</CardTitle>
          <CardDescription>
            Quatio is a game where you have to solve equations to get the
            highest score.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button disabled asChild>
            <Link href="/games/quatio">Coming soon...</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
