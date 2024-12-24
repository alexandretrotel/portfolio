import { generateEquation } from "../generateEquation";
import { Difficulty } from "@/types/quatio";

describe("generateEquation", () => {
  it('should generate a correct equation and solution for difficulty "easy" with 1 unknown', () => {
    const difficulty: Difficulty = "easy";
    const unknowns = 1;
    const result = generateEquation(difficulty, unknowns);

    expect(result.equation).toMatch(/^\d+x \+ \d+ = \d+$/);
    if (typeof result.solution === "string") {
      expect(parseFloat(result.solution)).not.toBeNaN();
    }
  });

  it('should generate a correct equation and solution for difficulty "medium" with 1 unknown', () => {
    const difficulty: Difficulty = "medium";
    const unknowns = 1;
    const result = generateEquation(difficulty, unknowns);

    expect(result.equation).toMatch(/^\d+x \+ \d+ = \d+$/);
    if (typeof result.solution === "string") {
      expect(parseFloat(result.solution)).not.toBeNaN();
    }
  });

  it('should generate a correct equation and solution for difficulty "hard" with 1 unknown', () => {
    const difficulty: Difficulty = "hard";
    const unknowns = 1;
    const result = generateEquation(difficulty, unknowns);

    expect(result.equation).toMatch(/^\d+x \+ \d+ = \d+$/);
    if (typeof result.solution === "string") {
      expect(parseFloat(result.solution)).not.toBeNaN();
    }
  });

  it('should generate a correct equation and solution for difficulty "easy" with 2 unknowns', () => {
    const difficulty: Difficulty = "easy";
    const unknowns = 2;
    const result = generateEquation(difficulty, unknowns);

    expect(result.equation).toMatch(/^\d+x \+ \d+y = \d+, \d+x \+ \d+y = \d+$/);
    if (typeof result.solution === "object") {
      expect(parseFloat(result.solution.x)).not.toBeNaN();
      expect(parseFloat(result.solution.y)).not.toBeNaN();
    }
  });

  it('should generate a correct equation and solution for difficulty "medium" with 2 unknowns', () => {
    const difficulty: Difficulty = "medium";
    const unknowns = 2;
    const result = generateEquation(difficulty, unknowns);

    expect(result.equation).toMatch(/^\d+x \+ \d+y = \d+, \d+x \+ \d+y = \d+$/);
    if (typeof result.solution === "object") {
      expect(parseFloat(result.solution.x)).not.toBeNaN();
      expect(parseFloat(result.solution.y)).not.toBeNaN();
    }
  });

  it('should generate a correct equation and solution for difficulty "hard" with 2 unknowns', () => {
    const difficulty: Difficulty = "hard";
    const unknowns = 2;
    const result = generateEquation(difficulty, unknowns);

    expect(result.equation).toMatch(/^\d+x \+ \d+y = \d+, \d+x \+ \d+y = \d+$/);
    if (typeof result.solution === "object") {
      expect(parseFloat(result.solution.x)).not.toBeNaN();
      expect(parseFloat(result.solution.y)).not.toBeNaN();
    }
  });

  it("should return an integer for the solution", () => {
    const difficulty: Difficulty = "easy";
    const unknowns = 1;
    const result = generateEquation(difficulty, unknowns);

    if (typeof result.solution === "string") {
      expect(result.solution).toMatch(/^\d+$/);
    }
  });

  it("should return an object with integer values for the solution", () => {
    const difficulty: Difficulty = "easy";
    const unknowns = 2;
    const result = generateEquation(difficulty, unknowns);

    if (typeof result.solution === "object") {
      expect(result.solution.x).toMatch(/^\d+$/);
      expect(result.solution.y).toMatch(/^\d+$/);
    }
  });
});
