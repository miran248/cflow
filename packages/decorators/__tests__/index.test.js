import decorate, {
  get, has
} from "../src";

import Decorator from "../src/Decorator";

class DecoratedObject { }

describe("decorators/index", () => {
  const target = new DecoratedObject;

  const decorator = new Decorator;
  const decorators = [ decorator ];

  test("has(undefined, Decorator) should throw error", () => {
    expect(
      () => has(undefined, Decorator)
    ).toThrow("target is required");
  });

  test("has(target, undefined) should throw error", () => {
    expect(
      () => has(target, undefined)
    ).toThrow("decoratorClass is required");
  });

  test("has(target, Decorator) should return false", () => {
    expect(
      has(target, Decorator)
    ).toBe(false);
  });

  test("get(undefined, Decorator) should throw error", () => {
    expect(
      () => get(undefined, Decorator)
    ).toThrow("target is required");
  });

  test("get(target, undefined) should throw error", () => {
    expect(
      () => get(target, undefined)
    ).toThrow("decoratorClass is required");
  });

  test("get(target, Decorator) should throw error", () => {
    expect(
      () => get(target, Decorator)
    ).toThrow("DecoratedObject is not Decorator");
  });

  test("decorate(undefined, decorators) should throw error", () => {
    expect(
      () => decorate(undefined, decorators)
    ).toThrow("target is required");
  });

  test("decorate(target, undefined) should throw error", () => {
    expect(
      () => decorate(target, undefined)
    ).toThrow("decorators is required");
  });

  test("decorate(target, decorators) should return undefined", () => {
    expect(
      decorate(target, decorators)
    ).toBeUndefined();
  });

  test("has(target, Decorator) should return true", () => {
    expect(
      has(target, Decorator)
    ).toBe(true);
  });

  test("get(target, Decorator) should return Decorator instance", () => {
    expect(
      get(target, Decorator)
    ).toBe(decorator);
  });
});
