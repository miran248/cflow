import Decorator, {
  decorate, key
} from "../src/Decorator";

import Reusable from "../src/Reusable";

class DecoratedObject { }

describe("decorators/Reusable", () => {
  const before = jest.fn();
  const after = jest.fn();

  const target = new DecoratedObject;

  const decorator = new Reusable(
    before,
    after
  );

  decorator[decorate](target);

  test("Reusable[key].toString() should equal 'Symbol(Reusable)'", () => {
    expect(
      Reusable[key].toString()
    ).toBe("Symbol(Reusable)");
  });

  test("decorator.before should equal before", () => {
    expect(
      decorator.before
    ).toBe(before);
  });

  test("decorator.after should equal after", () => {
    expect(
      decorator.after
    ).toBe(after);
  });

  test("decorator.reuse() should return undefined", () => {
    expect(
      decorator.reuse()
    ).toBeUndefined();
  });

  test("before should be called without params", () => {
    expect(
      before
    ).toHaveBeenCalledWith();
  });

  test("after should be called without params", () => {
    expect(
      after
    ).toHaveBeenCalledWith();
  });

  test("decorator.reuse(1, 2, 3) should return undefined", () => {
    expect(
      decorator.reuse(1, 2, 3)
    ).toBeUndefined();
  });

  test("before should be called with 1, 2, 3", () => {
    expect(
      before
    ).toHaveBeenCalledWith(1, 2, 3);
  });

  test("after should be called with 1, 2, 3", () => {
    expect(
      after
    ).toHaveBeenCalledWith(1, 2, 3);
  });
});
