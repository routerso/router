import { expect, test, describe } from "vitest";
import { constructBodyFromURLParameters } from "../lib/helpers/construct-body";

describe("constructBodyFromURLParameters", () => {
  test("should return an empty object when there are no URL parameters", () => {
    const searchParams = new URLSearchParams();

    const result = constructBodyFromURLParameters(searchParams);

    expect(result).toEqual({});
  });

  test("should construct an object with a single key-value pair from URL parameters", () => {
    const searchParams = new URLSearchParams("name=JohnDoe");

    const result = constructBodyFromURLParameters(searchParams);

    expect(result).toEqual({ name: "JohnDoe" });
  });

  test("should construct an object with multiple key-value pairs from URL parameters", () => {
    const searchParams = new URLSearchParams(
      "name=JohnDoe&age=30&country=USA&i=true"
    );

    const result = constructBodyFromURLParameters(searchParams);

    expect(result).toEqual({
      name: "JohnDoe",
      age: "30",
      country: "USA",
      i: "true",
    });
  });

  test("should handle URL parameters with empty values", () => {
    const searchParams = new URLSearchParams("name=&age=30&country=");

    const result = constructBodyFromURLParameters(searchParams);

    expect(result).toEqual({ name: "", age: "30", country: "" });
  });

  test("should handle URL parameters with special characters", () => {
    const searchParams = new URLSearchParams(
      "name=John%20Doe&city=New%20York&query=a%26b%3Dc"
    );

    const result = constructBodyFromURLParameters(searchParams);

    expect(result).toEqual({
      name: "John Doe",
      city: "New York",
      query: "a&b=c",
    });
  });

  test("should handle URL parameters with repeated keys by taking the last occurrence", () => {
    const searchParams = new URLSearchParams("name=John&name=Jane&name=Doe");

    const result = constructBodyFromURLParameters(searchParams);

    expect(result).toEqual({ name: "Doe" });
  });
});
