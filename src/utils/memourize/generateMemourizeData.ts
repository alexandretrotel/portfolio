import { MEMOURIZE_DIFFICULTY_LENGTH } from "@/data/games/memourize/parameters";
import { MemourizeDifficulty } from "@/types/games/memourize";

export const generateMemourizeData = (difficulty: MemourizeDifficulty) => {
  switch (difficulty) {
    case "easy":
      return generateEasyData();
    case "medium":
      return generateMediumData();
    case "hard":
      return generateHardData();
    default:
      return generateEasyData();
  }
};

export const generateEasyData = () => {
  const numbers = "0123456789";
  const data = Array.from(
    { length: MEMOURIZE_DIFFICULTY_LENGTH.easy },
    () => numbers[Math.floor(Math.random() * numbers.length)],
  );
  return data.join("");
};

export const generateMediumData = () => {
  const numbers = "0123456789";
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const data = Array.from(
    { length: MEMOURIZE_DIFFICULTY_LENGTH.medium },
    () => {
      const random = Math.random();
      if (random < 0.5) {
        return numbers[Math.floor(Math.random() * numbers.length)];
      }
      return letters[Math.floor(Math.random() * letters.length)].toUpperCase();
    },
  );
  return data.join("");
};

export const generateHardData = () => {
  const numbers = "0123456789";
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const symbols = "!@#$%^&*()_+";
  const data = Array.from({ length: MEMOURIZE_DIFFICULTY_LENGTH.hard }, () => {
    const random = Math.random();
    if (random < 0.33) {
      return numbers[Math.floor(Math.random() * numbers.length)];
    } else if (random < 0.66) {
      return letters[Math.floor(Math.random() * letters.length)].toUpperCase();
    }
    return symbols[Math.floor(Math.random() * symbols.length)];
  });
  return data.join("");
};
