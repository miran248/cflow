import {
  factory,
  factorize,
} from "../src/factories";

class Item { }

describe("unitfactory/factories", () => {
  var unitFactory = null;

  test("factory(undefined) should throw error", () => {
    expect(
      () => factory(undefined)
    ).toThrow("key is required");
  });

  test("factory('test') should throw error", () => {
    expect(
      () => factory("test")
    ).toThrow("test factory undefined");
  });

  test("factorize(undefined, Item) should throw error", () => {
    expect(
      () => factorize(undefined, Item)
    ).toThrow("key is required");
  });

  test("factorize('test', undefined) should throw error", () => {
    expect(
      () => factorize("test", undefined)
    ).toThrow("Class is required");
  });

  test("factorize('test', Item) should return UnitFactory instance for type Item", () => {
    expect(
      unitFactory = factorize("test", Item)
    ).toBe(factory("test"));
  });

  test("factorize('test', Item) should throw error", () => {
    expect(
      () => factorize("test", Item)
    ).toThrow("test factory already defined");
  });

  test("factory('test') should return UnitFactory instance", () => {
    expect(
      factory("test")
    ).toBe(unitFactory);
  });
});
