import {
  generateMemourizeData,
  generateEasyData,
  generateMediumData,
  generateHardData,
} from "../generateMemourizeData";
import { MEMOURIZE_DIFFICULTY_LENGTH } from "@/data/games/memourize/parameters";

describe("generateMemourizeData", () => {
  describe("generateEasyData", () => {
    it("should generate a 6-digit number", () => {
      const data = generateEasyData();
      expect(data.length).toBe(MEMOURIZE_DIFFICULTY_LENGTH.easy);
      expect(data).toMatch(
        new RegExp(`^[0-9]{${MEMOURIZE_DIFFICULTY_LENGTH.easy}}$`)
      );
    });

    it("should generate a random number", () => {
      const data1 = generateEasyData();
      const data2 = generateEasyData();
      expect(data1).not.toBe(data2);
    });

    it("should generate a number", () => {
      const data = generateEasyData();
      expect(data).toMatch(/^[0-9]+$/);
    });
  });

  describe("generateMediumData", () => {
    it("should generate a 9 length string", () => {
      const data = generateMediumData();
      expect(data.length).toBe(MEMOURIZE_DIFFICULTY_LENGTH.medium);
      expect(data).toMatch(
        new RegExp(`^[0-9A-Za-z]{${MEMOURIZE_DIFFICULTY_LENGTH.medium}}$`)
      );
    });

    it("should generate a random string", () => {
      const data1 = generateMediumData();
      const data2 = generateMediumData();
      expect(data1).not.toBe(data2);
    });

    it("should generate a string", () => {
      const data = generateMediumData();
      expect(data).toMatch(/^[0-9A-Z]+$/);
    });

    it("should not return lowercase letters", () => {
      const data = generateMediumData();
      expect(data).not.toMatch(/[a-z]/);
    });
  });

  describe("generateHardData", () => {
    it("should generate a 15 length string", () => {
      const data = generateHardData();
      expect(data.length).toBe(MEMOURIZE_DIFFICULTY_LENGTH.hard);
      expect(data).toMatch(
        new RegExp(
          `^[0-9A-Za-z!@#$%^&*()_+]{${MEMOURIZE_DIFFICULTY_LENGTH.hard}}$`
        )
      );
    });

    it("should generate a random string", () => {
      const data1 = generateHardData();
      const data2 = generateHardData();
      expect(data1).not.toBe(data2);
    });

    it("should generate a string", () => {
      const data = generateHardData();
      expect(data).toMatch(/^[0-9A-Z!@#$%^&*()_+]+$/);
    });

    it("should not return lowercase letters", () => {
      const data = generateHardData();
      expect(data).not.toMatch(/[a-z]/);
    });
  });

  it("should generate data based on difficulty", () => {
    const easyData = generateMemourizeData("easy");
    const mediumData = generateMemourizeData("medium");
    const hardData = generateMemourizeData("hard");

    expect(easyData).toMatch(
      new RegExp(`^[0-9]{${MEMOURIZE_DIFFICULTY_LENGTH.easy}}$`)
    );
    expect(mediumData).toMatch(
      new RegExp(`^[0-9A-Za-z]{${MEMOURIZE_DIFFICULTY_LENGTH.medium}}$`)
    );
    expect(hardData).toMatch(
      new RegExp(
        `^[0-9A-Za-z!@#$%^&*()_+]{${MEMOURIZE_DIFFICULTY_LENGTH.hard}}$`
      )
    );
  });
});
