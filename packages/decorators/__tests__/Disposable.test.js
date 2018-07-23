import Decorator, {
  decorate, key
} from "../src/Decorator";

import Disposable from "../src/Disposable";

class DecoratedObject { }

describe("decorators/Disposable", () => {
  const before = jest.fn();
  const after = jest.fn();

  const target = new DecoratedObject;

  const decorator = new Disposable(
    before,
    after
  );

  decorator[decorate](target);

  test("Disposable[key].toString() should equal 'Symbol(Disposable)'", () => {
    expect(
      Disposable[key].toString()
    ).toBe("Symbol(Disposable)");
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

  test("decorator.dispose() should return undefined", () => {
    expect(
      decorator.dispose()
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

  test("decorator.dispose(1, 2, 3) should return undefined", () => {
    expect(
      decorator.dispose(1, 2, 3)
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
