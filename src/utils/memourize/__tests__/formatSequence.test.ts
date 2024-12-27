import { formatSequence } from "../formatSequence";

describe("formatSequence", () => {
  it("should format a sequence of 5 digits", () => {
    const sequence = "12345";
    const formattedSequence = formatSequence(sequence);
    expect(formattedSequence).toBe("12 345");
  });

  it("should format a sequence of 10 digits", () => {
    const sequence = "1234567890";
    const formattedSequence = formatSequence(sequence);
    expect(formattedSequence).toBe("1 234 567 890");
  });

  it("should format a sequence of 15 digits", () => {
    const sequence = "123456789012345";
    const formattedSequence = formatSequence(sequence);
    expect(formattedSequence).toBe("123 456 789 012 345");
  });

  it("should format a sequence of 20 digits", () => {
    const sequence = "12345678901234567890";
    const formattedSequence = formatSequence(sequence);
    expect(formattedSequence).toBe("12 345 678 901 234 567 890");
  });

  it("should format a sequence of digits and letters", () => {
    const sequence = "12345ABCDE";
    const formattedSequence = formatSequence(sequence);
    expect(formattedSequence).toBe("1 234 5AB CDE");
  });

  it("should format a sequence of letters", () => {
    const sequence = "ABCDE";
    const formattedSequence = formatSequence(sequence);
    expect(formattedSequence).toBe("AB CDE");
  });

  it("should format a sequence of symbols", () => {
    const sequence = "!@#$%^&*()_+";
    const formattedSequence = formatSequence(sequence);
    expect(formattedSequence).toBe("!@# $%^ &*( )_+");
  });

  it("should format a sequence of mixed symbols", () => {
    const sequence = "123!@#456$%^789&*()012_+345";
    const formattedSequence = formatSequence(sequence);
    expect(formattedSequence).toBe("123 !@# 456 $%^ 789 &*( )01 2_+ 345");
  });
});
