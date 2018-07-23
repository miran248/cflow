import Decorator, {
  decorate, key
} from "../src/Decorator";

import Actionable, * as d from "../src/Actionable";

class DecoratedObject { }

describe("decorators/Actionable", () => {
  const before = jest.fn();
  const after = jest.fn();
  const action = jest.fn();

  const target = new DecoratedObject;

  const decorator = new Actionable(
    before,
    after
  );

  decorator[decorate](target);

  test("Actionable[key].toString() should equal 'Symbol(Actionable)'", () => {
    expect(
      Actionable[key].toString()
    ).toBe("Symbol(Actionable)");
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

  test("decorator[d.action](action) should return undefined", () => {
    expect(
      decorator[d.action](action)
    ).toBeUndefined();
  });

  test("before should be called without params", () => {
    expect(
      before
    ).toHaveBeenCalledWith();
  });

  test("action should be called without params", () => {
    expect(
      action
    ).toHaveBeenCalledWith();
  });

  test("after should be called without params", () => {
    expect(
      after
    ).toHaveBeenCalledWith();
  });

  test("decorator[d.action](action, 1, 2, 3) should return undefined", () => {
    expect(
      decorator[d.action](action, 1, 2, 3)
    ).toBeUndefined();
  });

  test("before should be called with 1, 2, 3", () => {
    expect(
      before
    ).toHaveBeenCalledWith(1, 2, 3);
  });

  test("action should be called without params", () => {
    expect(
      action
    ).toHaveBeenCalledWith();
  });

  test("after should be called with 1, 2, 3", () => {
    expect(
      after
    ).toHaveBeenCalledWith(1, 2, 3);
  });
});
