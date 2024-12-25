import { isOutOfBonds } from "../isOutOfBonds";

describe("isOutOfBonds", () => {
  it("should return true if the position is out of bonds", () => {
    expect(isOutOfBonds([-1, 0], 5)).toBe(true);
    expect(isOutOfBonds([0, -1], 5)).toBe(true);
    expect(isOutOfBonds([5, 0], 5)).toBe(true);
    expect(isOutOfBonds([0, 5], 5)).toBe(true);
  });

  it("should return false if the position is within bonds", () => {
    expect(isOutOfBonds([0, 0], 5)).toBe(false);
    expect(isOutOfBonds([4, 4], 5)).toBe(false);
  });
});
