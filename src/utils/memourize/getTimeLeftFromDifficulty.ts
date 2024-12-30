import { TIME_TO_MEMORIZE } from "@/data/games/memourize/parameters";
import { MemourizeDifficulty } from "@/types/games/memourize";

export const getTimeLeftFromDifficulty = (difficulty: MemourizeDifficulty) => {
  switch (difficulty) {
    case "easy":
      return TIME_TO_MEMORIZE.easy;
    case "medium":
      return TIME_TO_MEMORIZE.medium;
    case "hard":
      return TIME_TO_MEMORIZE.hard;
    default:
      return TIME_TO_MEMORIZE.easy;
  }
};
