import { getRandomPosition } from "./getRandomPosition";
import { isOnSnake } from "./isOnSnake";

export const spawnGoldApple = (snake: number[][]) => {
  let newGoldApple: number[];
  do {
    newGoldApple = getRandomPosition();
  } while (isOnSnake(snake, newGoldApple));
  return newGoldApple;
};
