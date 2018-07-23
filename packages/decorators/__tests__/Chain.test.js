import Decorator, {
  decorate, key
} from "../src/Decorator";

import Chain from "../src/Chain";

class DecoratedObject { }

describe("decorators/Chain", () => {
  const links = [
    jest.fn().mockReturnValue(123),
    jest.fn().mockReturnValue(456),
  ];

  const resetCallback = jest.fn();

  const target = new DecoratedObject;

  const decorator = new Chain(
    links,
    resetCallback
  );

  decorator[decorate](target);

  test("Chain[key].toString() should equal 'Symbol(Chain)'", () => {
    expect(
      Chain[key].toString()
    ).toBe("Symbol(Chain)");
  });

  test("decorator.links should equal links", () => {
    expect(
      decorator.links
    ).toBe(links);
  });

  test("decorator.resetCallback should equal resetCallback", () => {
    expect(
      decorator.resetCallback
    ).toBe(resetCallback);
  });

  test("decorator.index should equal 0", () => {
    expect(
      decorator.index
    ).toBe(0);
  });

  test("decorator.run() should return 123", () => {
    expect(
      decorator.run()
    ).toBe(123);
  });

  test("links[0] should be called with self reference and without params", () => {
    expect(
      links[0]
    ).toHaveBeenCalledWith(decorator);
  });

  test("decorator.run(1, 2, 3) should return 123", () => {
    expect(
      decorator.run(1, 2, 3)
    ).toBe(123);
  });

  test("links[0] should be called with self reference and 1, 2, 3", () => {
    expect(
      links[0]
    ).toHaveBeenCalledWith(decorator, 1, 2, 3);
  });

  test("decorator.next() should return true", () => {
    expect(
      decorator.next()
    ).toBe(true);
  });

  test("decorator.index should equal 1", () => {
    expect(
      decorator.index
    ).toBe(1);
  });

  test("decorator.run() should return 456", () => {
    expect(
      decorator.run()
    ).toBe(456);
  });

  test("links[1] should be called with self reference and without params", () => {
    expect(
      links[1]
    ).toHaveBeenCalledWith(decorator);
  });

  test("decorator.run(1, 2, 3) should return 456", () => {
    expect(
      decorator.run(1, 2, 3)
    ).toBe(456);
  });

  test("links[1] should be called with self reference and 1, 2, 3", () => {
    expect(
      links[1]
    ).toHaveBeenCalledWith(decorator, 1, 2, 3);
  });

  test("decorator.next() should return false", () => {
    expect(
      decorator.next()
    ).toBe(false);
  });

  test("decorator.index should equal 1", () => {
    expect(
      decorator.index
    ).toBe(1);
  });

  test("decorator.reset() should return undefined", () => {
    expect(
      decorator.reset()
    ).toBeUndefined();
  });

  test("decorator.index should equal 0", () => {
    expect(
      decorator.index
    ).toBe(0);
  });

  test("resetCallback should be called without params", () => {
    expect(
      resetCallback
    ).toHaveBeenCalledWith();
  });

  test("decorator.run() should return 123", () => {
    expect(
      decorator.run()
    ).toBe(123);
  });

  test("links[0] should be called with self reference and without params", () => {
    expect(
      links[0]
    ).toHaveBeenCalledWith(decorator);
  });
});
