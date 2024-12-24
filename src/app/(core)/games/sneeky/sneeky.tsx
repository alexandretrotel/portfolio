"use client";
import "client-only";

import { useSneeky } from "@/hooks/games/sneeky/use-sneeky";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BOARD_SIZE } from "@/data/games/sneeky/parameters";

export default function Sneeky() {
  const {
    snake,
    gameOver,
    score,
    isOnSnake,
    apple,
    goldApple,
    bomb,
    resetGame,
  } = useSneeky();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Sneeky</CardTitle>
      </CardHeader>
      <CardContent>
        {gameOver ? (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Game Over!</h2>
            <p className="mb-4">Score: {score}</p>
            <Button onClick={resetGame}>Play Again</Button>
          </div>
        ) : (
          <div
            className="grid gap-1 mb-4"
            style={{
              gridTemplateRows: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
              gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => {
              const x = Math.floor(i / BOARD_SIZE);
              const y = i % BOARD_SIZE;
              const isSnake = isOnSnake(snake, [x, y]);
              const isApple = apple[0] === x && apple[1] === y;
              const isGoldApple =
                goldApple && goldApple[0] === x && goldApple[1] === y;
              const isBomb = bomb && bomb[0] === x && bomb[1] === y;

              return (
                <div
                  key={i}
                  className={`aspect-square rounded-sm flex items-center justify-center ${
                    isSnake
                      ? "bg-green-500"
                      : isApple
                      ? "bg-red-500"
                      : isGoldApple
                      ? "bg-yellow-500"
                      : isBomb
                      ? "bg-gray-500"
                      : "bg-gray-400"
                  }`}
                >
                  {isSnake && <span className="text-sm">🐍</span>}
                  {isApple && <span className="text-sm">🍎</span>}
                  {isGoldApple && <span className="text-sm">🌟</span>}
                  {isBomb && <span className="text-sm">💣</span>}
                </div>
              );
            })}
          </div>
        )}
        {!gameOver && (
          <div className="text-center text-lg font-semibold">
            Score: {score}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
