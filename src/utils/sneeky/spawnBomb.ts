import { BOARD_SIZE } from "@/data/games/sneeky/parameters";
import { isOnSnake } from "./isOnSnake";

export const spawnBomb = (snake: number[][]) => {
  if (snake.length >= BOARD_SIZE - 1) {
    return null;
  }

  const head = snake[0];
  const nearbyOffsets = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const potentialPositions = nearbyOffsets.map(([dx, dy]) => [
    head[0] + dx,
    head[1] + dy,
  ]);
  const validPositions = potentialPositions.filter(
    ([x, y]) =>
      x >= 0 &&
      x < BOARD_SIZE &&
      y >= 0 &&
      y < BOARD_SIZE &&
      !isOnSnake(snake, [x, y])
  );
  return validPositions.length > 0
    ? validPositions[Math.floor(Math.random() * validPositions.length)]
    : null;
};
