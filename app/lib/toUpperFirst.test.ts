import { toUpperFirstChar } from "./toUpperFirst";

describe("toUpperFirstChar", () => {
  it("should capitalize the first character of a string", () => {
    expect(toUpperFirstChar("hello")).toBe("Hello");
    expect(toUpperFirstChar("world")).toBe("World");
  });

  it("should return the same string if the first character is already uppercase", () => {
    expect(toUpperFirstChar("Hello")).toBe("Hello");
    expect(toUpperFirstChar("World")).toBe("World");
  });

  it("should return the same string all characters are already uppercase", () => {
    expect(toUpperFirstChar("HELLO")).toBe("HELLO");
    expect(toUpperFirstChar("WORLD")).toBe("WORLD");
  });

  it("should handle empty strings", () => {
    expect(toUpperFirstChar("")).toBe("");
  });

  it("should handle single character strings", () => {
    expect(toUpperFirstChar("a")).toBe("A");
    expect(toUpperFirstChar("Z")).toBe("Z");
  });
});
