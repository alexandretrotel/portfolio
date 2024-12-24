import { isOnSnake } from "../isOnSnake";

describe("isOnSnake", () => {
  const snake = [
    [0, 0],
    [0, 1],
    [0, 2],
  ];

  it("should return true if the position is on the snake", () => {
    expect(isOnSnake(snake, [0, 0])).toBe(true);
    expect(isOnSnake(snake, [0, 1])).toBe(true);
    expect(isOnSnake(snake, [0, 2])).toBe(true);
  });

  it("should return false if the position is not on the snake", () => {
    expect(isOnSnake(snake, [1, 0])).toBe(false);
    expect(isOnSnake(snake, [0, 3])).toBe(false);
  });

  it("should return false if the snake is empty", () => {
    expect(isOnSnake([], [0, 0])).toBe(false);
  });
});
