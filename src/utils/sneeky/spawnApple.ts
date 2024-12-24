import { getRandomPosition } from "./getRandomPosition";
import { isOnSnake } from "./isOnSnake";

export const spawnApple = (snake: number[][]) => {
  let newApple: number[];
  do {
    newApple = getRandomPosition();
  } while (isOnSnake(snake, newApple));
  return newApple;
};
