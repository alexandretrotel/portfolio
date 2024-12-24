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
  SPEED_BOOST,
  SPEED_BOOST_DURATION,
} from "@/data/games/sneeky/parameters";
import Game from "./game";

export default function Sneeky() {
  return (
    <Card className="w-full max-w-md mx-auto relative">
      <div className="absolute top-0 right-0 p-6">
        <Popover>
          <PopoverTrigger>
            <InfoIcon className="w-6 h-6 text-muted-foreground cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent className="md:w-96">
            <div className="py-2 px-4">
              <h2 className="text-xl font-bold text-center text-foreground mb-4">
                How to Play
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
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
                  bombs and your own tail.
                </li>
                <li>
                  <span className="font-semibold">Dash:</span> Press{" "}
                  <kbd>space</kbd> to dash, increasing your speed by{" "}
                  <span className="font-bold">{SPEED_BOOST}%</span> for{" "}
                  <span className="font-bold">
                    {SPEED_BOOST_DURATION / 1000}
                  </span>{" "}
                  seconds.
                </li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Sneeky</CardTitle>
      </CardHeader>
      <CardContent>
        <Game />
      </CardContent>
    </Card>
  );
}
