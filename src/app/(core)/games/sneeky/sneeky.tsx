"use client";
import "client-only";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InfoIcon } from "lucide-react";
import {
  DASH_BOOST,
  DASH_BOOST_DURATION,
} from "@/data/games/sneeky/parameters";
import Game from "./game";

export default function Sneeky() {
  return (
    <Card className="relative mx-auto w-full max-w-md">
      <div className="absolute right-0 top-0 p-6">
        <Popover>
          <PopoverTrigger>
            <InfoIcon className="h-6 w-6 cursor-pointer text-muted-foreground" />
          </PopoverTrigger>
          <PopoverContent className="md:w-96">
            <div className="px-4 py-2">
              <h2 className="mb-4 text-center text-xl font-semibold text-foreground">
                How to Play
              </h2>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>
                  <span className="font-semibold">Move:</span> Use the arrow
                  keys to move the snake.
                </li>
                <li>
                  <span className="font-semibold">Grow:</span> Collect apples to
                  grow the snake.
                </li>
                <li>
                  <span className="font-semibold">Avoid:</span> Stay away from
                  your own tail and the walls.
                </li>
                <li>
                  <span className="font-semibold">Dash:</span> Press{" "}
                  <kbd>space</kbd> to dash, increasing your speed by{" "}
                  <span className="font-semibold">{DASH_BOOST}%</span> for{" "}
                  <span className="font-semibold">
                    {DASH_BOOST_DURATION / 1000}
                  </span>{" "}
                  seconds.
                </li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold">
          Sneeky
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Game />
      </CardContent>
    </Card>
  );
}
