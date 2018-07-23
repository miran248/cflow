import Decorator, {
  decorate, key
} from "../src/Decorator";

import Shareable from "../src/Shareable";

class DecoratedObject { }

describe("decorators/Shareable", () => {
  const target = new DecoratedObject;

  const decorator = new Shareable;

  decorator[decorate](target);

  test("Shareable[key].toString() should equal 'Symbol(Shareable)'", () => {
    expect(
      Shareable[key].toString()
    ).toBe("Symbol(Shareable)");
  });

  test("decorator.count should equal 0", () => {
    expect(
      decorator.count
    ).toBe(0);
  });

  test("decorator.retain() should return undefined", () => {
    expect(
      decorator.retain()
    ).toBeUndefined();
  });

  test("decorator.count should equal 1", () => {
    expect(
      decorator.count
    ).toBe(1);
  });

  test("decorator.retain() should return undefined", () => {
    expect(
      decorator.retain()
    ).toBeUndefined();
  });

  test("decorator.count should equal 2", () => {
    expect(
      decorator.count
    ).toBe(2);
  });

  test("decorator.release() should return undefined", () => {
    expect(
      decorator.release()
    ).toBeUndefined();
  });

  test("decorator.count should equal 1", () => {
    expect(
      decorator.count
    ).toBe(1);
  });

  test("decorator.retain() should return undefined", () => {
    expect(
      decorator.retain()
    ).toBeUndefined();
  });

  test("decorator.count should equal 2", () => {
    expect(
      decorator.count
    ).toBe(2);
  });

  test("decorator.release() should return undefined", () => {
    expect(
      decorator.release()
    ).toBeUndefined();
  });

  test("decorator.count should equal 1", () => {
    expect(
      decorator.count
    ).toBe(1);
  });

  test("decorator.release() should return undefined", () => {
    expect(
      decorator.release()
    ).toBeUndefined();
  });

  test("decorator.count should equal 0", () => {
    expect(
      decorator.count
    ).toBe(0);
  });
});
