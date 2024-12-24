import { Button } from "@/components/ui/button";
import { BOARD_SIZE } from "@/data/games/sneeky/parameters";
import { useSneeky } from "@/hooks/games/sneeky/use-sneeky";

export default function Game() {
  const {
    snake,
    gameOver,
    score,
    isOnSnake,
    apple,
    resetGame,
    activeItems,
    startTime,
    endTime,
    init,
    setInit,
    duration,
  } = useSneeky();

  if (init || gameOver) {
    return (
      <div className="text-center flex flex-col gap-4">
        <h2 className="text-lg font-semibold">{gameOver && "Game Over!"}</h2>
        <div className="flex flex-col gap-1">
          {!init && <p>Score: {score}</p>}
          <p>
            Highest Score:{" "}
            {(!!localStorage && localStorage.getItem("sneekyHighestScore")) ??
              0}
          </p>
          {!init && (
            <p>
              Duration:{" "}
              {endTime
                ? `${Math.floor(
                    (endTime.getTime() - startTime.getTime()) / 1000
                  )} seconds`
                : "N/A"}
            </p>
          )}
        </div>
        <Button
          className="mt-4"
          onClick={() => (gameOver ? resetGame() : setInit(false))}
        >
          {gameOver ? "Restart" : "Start"}
        </Button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-4">
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
            const item = activeItems.find(
              (item) => item.position[0] === x && item.position[1] === y
            );

            return (
              <div
                key={i}
                className={`aspect-square rounded-sm flex items-center justify-center ${
                  isSnake
                    ? "bg-green-500"
                    : isApple
                    ? "bg-red-500"
                    : item?.type === "goldApple"
                    ? "bg-yellow-500"
                    : item?.type === "bomb"
                    ? "bg-gray-500"
                    : item?.type === "cut"
                    ? "bg-blue-500"
                    : "bg-muted"
                }`}
              >
                {isSnake && <span className="text-sm">🐍</span>}
                {isApple && <span className="text-sm">🍎</span>}
                {item?.type === "goldApple" && (
                  <span className="text-sm">🌟</span>
                )}
                {item?.type === "bomb" && <span className="text-sm">💣</span>}
                {item?.type === "cut" && <span className="text-sm">🤯</span>}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-center text-lg font-semibold">Score: {score}</p>
            <p className="text-center text-lg font-semibold">
              Length: {snake.length}
            </p>
            <p className="text-center text-lg font-semibold">
              Duration: {duration} second{duration > 1 && "s"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
