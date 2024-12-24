export const isOnSnake = (snake: number[][], pos: number[]) => {
  return snake.some((s) => s[0] === pos[0] && s[1] === pos[1]);
};
