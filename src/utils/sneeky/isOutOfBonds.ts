export const isOutOfBonds = (pos: number[], boardSize: number) => {
  return pos[0] < 0 || pos[0] >= boardSize || pos[1] < 0 || pos[1] >= boardSize;
};
