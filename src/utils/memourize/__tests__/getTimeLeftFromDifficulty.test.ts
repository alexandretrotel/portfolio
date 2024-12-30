import { MemourizeDifficulty } from "@/types/games/memourize";
import { getTimeLeftFromDifficulty } from "../getTimeLeftFromDifficulty";
import { TIME_TO_MEMORIZE } from "@/data/games/memourize/parameters";

describe("getTimeLeftFromDifficulty", () => {
  it("should return the correct time for easy difficulty", () => {
    expect(getTimeLeftFromDifficulty("easy")).toBe(TIME_TO_MEMORIZE.easy);
  });

  it("should return the correct time for medium difficulty", () => {
    expect(getTimeLeftFromDifficulty("medium")).toBe(TIME_TO_MEMORIZE.medium);
  });

  it("should return the correct time for hard difficulty", () => {
    expect(getTimeLeftFromDifficulty("hard")).toBe(TIME_TO_MEMORIZE.hard);
  });

  it("should return the correct time for unknown difficulty", () => {
    expect(getTimeLeftFromDifficulty("unknown" as MemourizeDifficulty)).toBe(
      TIME_TO_MEMORIZE.easy
    );
  });
});
