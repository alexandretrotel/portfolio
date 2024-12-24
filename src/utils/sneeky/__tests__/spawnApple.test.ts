import { BOARD_SIZE } from "@/data/games/sneeky/parameters";
import { spawnApple } from "../spawnApple";

describe("spawnApple", () => {
  const snake = [
    [0, 0],
    [0, 1],
    [0, 2],
  ];

  it("should return a position that is not on the snake", () => {
    const apple = spawnApple(snake);
    expect(
      snake.some(
        (segment) => segment[0] === apple[0] && segment[1] === apple[1]
      )
    ).toBe(false);
  });

  it("should return a position that is within the board", () => {
    const apple = spawnApple(snake);
    expect(apple[0]).toBeGreaterThanOrEqual(0);
    expect(apple[0]).toBeLessThan(BOARD_SIZE);
    expect(apple[1]).toBeGreaterThanOrEqual(0);
    expect(apple[1]).toBeLessThan(BOARD_SIZE);
  });
});
