import { BOARD_SIZE } from "@/data/games/sneeky/parameters";
import { getRandomPosition } from "../getRandomPosition";

describe("getRandomPosition", () => {
  it("should return a random position", () => {
    const position = getRandomPosition();
    expect(position).toHaveLength(2);
    expect(position[0]).toBeGreaterThanOrEqual(0);
    expect(position[0]).toBeLessThan(BOARD_SIZE);
    expect(position[1]).toBeGreaterThanOrEqual(0);
    expect(position[1]).toBeLessThan(BOARD_SIZE);
  });

  it("should return a random position within the board size", () => {
    const position = getRandomPosition();
    expect(position).toHaveLength(2);
    expect(position[0]).toBeGreaterThanOrEqual(0);
    expect(position[0]).toBeLessThan(BOARD_SIZE);
    expect(position[1]).toBeGreaterThanOrEqual(0);
    expect(position[1]).toBeLessThan(BOARD_SIZE);
  });
});
