import Animation from "@/components/core/animation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const games = [
  {
    name: "Quatio",
    description:
      "Quatio is a game where you have to solve equations to get the highest score.",
    href: "/games/quatio",
    image: "/games/quatio.png",
  },
  {
    name: "Sneeky",
    description: "Sneeky is a remaster of the classic Snake game.",
    href: "/games/sneeky",
    image: "/games/sneeky.png",
  },
  {
    name: "Memourize",
    description: "Memourize is a game to test your memory.",
    href: "/games/memourize",
    image: "/games/memourize.png",
  },
];

export default async function Games() {
  return (
    <Animation>
      <div className="flex flex-col gap-4">
        <div className="flex max-w-sm flex-col">
          <h1 className="text-lg font-bold">Games</h1>
          <p className="text-sm text-muted-foreground">
            Play my games to have fun and keep your brain sharp.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
          {games.map((game, index) => (
            <Animation key={game.name} delay={index * 0.25}>
              <Card
                key={game.name}
                className="flex h-full flex-col justify-between"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{game.name}</CardTitle>
                    <Image
                      src={game.image}
                      alt={game.name}
                      width={32}
                      height={32}
                    />
                  </div>
                  <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild>
                    <Link href={game.href}>Play now</Link>
                  </Button>
                </CardFooter>
              </Card>
            </Animation>
          ))}
        </div>
      </div>
    </Animation>
  );
}
