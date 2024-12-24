import { spawnGoldApple } from "../spawnGoldApple";
import { BOARD_SIZE } from "@/data/games/sneeky/parameters";

describe("spawnGoldApple", () => {
  const snake = [
    [0, 0],
    [0, 1],
    [0, 2],
  ];

  it("should return a position that is not on the snake", () => {
    const goldApple = spawnGoldApple(snake);
    expect(
      snake.some(
        (segment) => segment[0] === goldApple[0] && segment[1] === goldApple[1]
      )
    ).toBe(false);
  });

  it("should return a position that is within the board", () => {
    const goldApple = spawnGoldApple(snake);
    expect(goldApple[0]).toBeGreaterThanOrEqual(0);
    expect(goldApple[0]).toBeLessThan(BOARD_SIZE);
    expect(goldApple[1]).toBeGreaterThanOrEqual(0);
    expect(goldApple[1]).toBeLessThan(BOARD_SIZE);
  });
});
