import { spawnBomb } from "../spawnBomb";
import { BOARD_SIZE } from "@/data/games/sneeky/parameters";

describe("spawnBomb", () => {
  const snake = [
    [0, 0],
    [0, 1],
    [0, 2],
  ];

  it("should return a position that is not on the snake", () => {
    const bomb = spawnBomb(snake);
    if (!bomb) {
      throw new Error("Bomb should not be undefined");
    }

    expect(
      snake.some((segment) => segment[0] === bomb[0] && segment[1] === bomb[1])
    ).toBe(false);
  });

  it("should return a position that is within the board", () => {
    const bomb = spawnBomb(snake);

    if (!bomb) {
      throw new Error("Bomb should not be undefined");
    }

    expect(bomb[0]).toBeGreaterThanOrEqual(0);
    expect(bomb[0]).toBeLessThan(BOARD_SIZE);
    expect(bomb[1]).toBeGreaterThanOrEqual(0);
    expect(bomb[1]).toBeLessThan(BOARD_SIZE);
  });

  it("should return undefined if the snake is too long", () => {
    const snake = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
      [0, 9],
      [0, 10],
      [0, 11],
      [0, 12],
      [0, 13],
      [0, 14],
    ];

    const bomb = spawnBomb(snake);
    expect(bomb).toBeNull();
  });
});
