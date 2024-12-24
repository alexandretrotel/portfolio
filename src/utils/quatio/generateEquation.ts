import { Difficulty } from "@/types/quatio";

export const generateEquation = (difficulty: Difficulty, unknowns: number) => {
  const maxRange =
    difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 50;

  if (unknowns === 1) {
    const a = Math.floor(Math.random() * maxRange) + 1;
    const x = Math.floor(Math.random() * maxRange);
    const b = Math.floor(Math.random() * maxRange);
    const c = a * x + b;
    return {
      equation: `${a}x + ${b} = ${c}`,
      solution: x.toString(),
    };
  } else {
    const a = Math.floor(Math.random() * maxRange) + 1;
    const b = Math.floor(Math.random() * maxRange) + 1;
    const x = Math.floor(Math.random() * maxRange);
    const y = Math.floor(Math.random() * maxRange);
    const c = a * x + b * y;

    const d = Math.floor(Math.random() * maxRange) + 1;
    const e = Math.floor(Math.random() * maxRange) + 1;
    const f = d * x + e * y;

    return {
      equation: `${a}x + ${b}y = ${c}, ${d}x + ${e}y = ${f}`,
      solution: { x: x.toString(), y: y.toString() },
    };
  }
};
