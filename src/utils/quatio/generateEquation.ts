import { QuatioDifficulty } from "@/types/games/quatio";

export const generateEquation = (
  difficulty: QuatioDifficulty,
  unknowns: number,
) => {
  const maxRange =
    difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 50;

  const getRandomNonZero = () => Math.floor(Math.random() * maxRange) + 1;

  if (unknowns === 1) {
    const a = getRandomNonZero();
    const x = getRandomNonZero();
    const b = getRandomNonZero();
    const c = a * x + b;
    return {
      equation: `${a}x + ${b} = ${c}`,
      solution: x.toString(),
    };
  } else {
    const a = getRandomNonZero();
    const b = getRandomNonZero();
    const x = getRandomNonZero();
    const y = getRandomNonZero();
    const c = a * x + b * y;

    const d = getRandomNonZero();
    const e = getRandomNonZero();
    const f = d * x + e * y;

    return {
      equation: `${a}x + ${b}y = ${c}, ${d}x + ${e}y = ${f}`,
      solution: { x: x.toString(), y: y.toString() },
    };
  }
};
