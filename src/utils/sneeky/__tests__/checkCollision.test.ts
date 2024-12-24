import { checkCollision } from "../checkCollision";

describe("checkCollision", () => {
  it("should return true if head and position are the same", () => {
    expect(checkCollision([1, 1], [1, 1])).toBe(true);
  });

  it("should return false if head and position are different", () => {
    expect(checkCollision([1, 1], [1, 2])).toBe(false);
  });
});
