import { BOARD_SIZE } from "@/data/games/sneeky/parameters";

export const spawnItem = (
  snake: number[][],
  otherItems: (number[] | null)[],
): number[] => {
  let position;
  const isConflict = (pos: number[]): boolean =>
    snake.some((segment) => segment[0] === pos[0] && segment[1] === pos[1]) ||
    otherItems.some((item) => item && item[0] === pos[0] && item[1] === pos[1]);

  do {
    position = [
      Math.floor(Math.random() * BOARD_SIZE),
      Math.floor(Math.random() * BOARD_SIZE),
    ];
  } while (isConflict(position));

  return position;
};
