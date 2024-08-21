import { expect, test, describe } from "vitest";
import * as validation from "../lib/validation";

describe("convertToCorrectTypes", () => {
  test('should convert "true" and "false" strings to boolean values', () => {
    const data = { isActive: "true", isVerified: "false" };
    const schema: GeneralSchema[] = [
      { isActive: "boolean" },
      { isVerified: "boolean" },
    ];

    const result = validation.convertToCorrectTypes(data, schema);
    console.log(result);

    expect(result.isActive).toBe(true);
    expect(result.isVerified).toBe(false);
  });

  test("should convert strings to numbers", () => {
    const data = { age: "30", score: "NaN", invalidNumber: "abc" };
    const schema: GeneralSchema[] = [
      { age: "number" },
      { score: "number" },
      { invalidNumber: "number" },
    ];

    const result = validation.convertToCorrectTypes(data, schema);

    expect(result.age).toBe(30);
    expect(result.score).toBe(undefined);
    expect(result.invalidNumber).toBe(undefined);
  });

  test("should not modify strings", () => {
    const data = { name: "John Doe", country: "USA" };
    const schema: GeneralSchema[] = [{ name: "string" }, { country: "string" }];

    const result = validation.convertToCorrectTypes(data, schema);

    expect(result.name).toBe("John Doe");
    expect(result.country).toBe("USA");
  });

  test("should handle mixed types in data", () => {
    const data = {
      name: "Jane Doe",
      isActive: "true",
      age: "28",
      invalidNumber: "not a number",
    };
    const schema: GeneralSchema[] = [
      { name: "string" },
      { isActive: "boolean" },
      { age: "number" },
      { invalidNumber: "number" },
    ];

    const result = validation.convertToCorrectTypes(data, schema);

    expect(result.name).toBe("Jane Doe");
    expect(result.isActive).toBe(true);
    expect(result.age).toBe(28);
    expect(result.invalidNumber).toBe(undefined);
  });

  test("should return empty object when schema is empty", () => {
    const data = { name: "Jane Doe", isActive: "true", age: "28" };
    const schema: GeneralSchema[] = [];

    const result = validation.convertToCorrectTypes(data, schema);

    expect(result).toEqual({});
  });

  test("should return an object with undefined values if keys are missing in data", () => {
    const data = { name: "Jane Doe" };
    const schema: GeneralSchema[] = [
      { name: "string" },
      { isActive: "boolean" },
      { age: "number" },
    ];

    const result = validation.convertToCorrectTypes(data, schema);

    expect(result.name).toBe("Jane Doe");
    expect(result.isActive).toBe(false);
    expect(result.age).toBe(undefined);
  });
});
