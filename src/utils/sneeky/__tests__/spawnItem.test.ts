import { BOARD_SIZE } from "@/data/games/sneeky/parameters";
import { spawnItem } from "../spawnItem";

describe("spawnItem", () => {
  it("should return a position that is not occupied by the snake or other items", () => {
    const snake = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];
    const otherItems = [[1, 0], [1, 1], null];
    const position = spawnItem(snake, otherItems);

    expect(position).not.toEqual([0, 0]);
    expect(position).not.toEqual([0, 1]);
    expect(position).not.toEqual([0, 2]);
    expect(position).not.toEqual([1, 0]);
    expect(position).not.toEqual([1, 1]);
  });

  it("should return a position within the board size", () => {
    const snake = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];
    const otherItems = [[1, 0], [1, 1], null];
    const position = spawnItem(snake, otherItems);

    expect(position[0]).toBeGreaterThanOrEqual(0);
    expect(position[0]).toBeLessThan(BOARD_SIZE);
    expect(position[1]).toBeGreaterThanOrEqual(0);
    expect(position[1]).toBeLessThan(BOARD_SIZE);
  });

  it("should return a position that is not occupied by the snake or other items", () => {
    const snake = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];
    const otherItems = [[1, 0], [1, 1], null];
    const position = spawnItem(snake, otherItems);

    expect(position).not.toEqual([0, 0]);
    expect(position).not.toEqual([0, 1]);
    expect(position).not.toEqual([0, 2]);
    expect(position).not.toEqual([1, 0]);
    expect(position).not.toEqual([1, 1]);
  });
});
