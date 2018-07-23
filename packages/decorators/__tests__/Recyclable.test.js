import Decorator, {
  decorate, key
} from "../src/Decorator";

import Recyclable from "../src/Recyclable";

class DecoratedObject { }

describe("decorators/Recyclable", () => {
  const before = jest.fn();
  const after = jest.fn();

  const owner = {
    store: jest.fn(),
  };

  const target = new DecoratedObject;

  const decorator = new Recyclable(
    before,
    after
  );

  decorator[decorate](target);

  test("Recyclable[key].toString() should equal 'Symbol(Recyclable)'", () => {
    expect(
      Recyclable[key].toString()
    ).toBe("Symbol(Recyclable)");
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

  test("decorator.recycle() should throw error", () => {
    expect(
      () => decorator.recycle()
    ).toThrow("owner is required");
  });

  test("decorator.recycle() should return undefined", () => {
    decorator.owner = owner;
    
    expect(
      decorator.recycle()
    ).toBeUndefined();
  });

  test("before should be called without params", () => {
    expect(
      before
    ).toHaveBeenCalledWith();
  });

  test("owner.store should be called with target argument", () => {
    expect(
      owner.store
    ).toHaveBeenCalledWith(target);
  });

  test("after should be called without params", () => {
    expect(
      after
    ).toHaveBeenCalledWith();
  });

  test("decorator.recycle(1, 2, 3) should return undefined", () => {
    expect(
      decorator.recycle(1, 2, 3)
    ).toBeUndefined();
  });

  test("before should be called with 1, 2, 3", () => {
    expect(
      before
    ).toHaveBeenCalledWith(1, 2, 3);
  });

  test("owner.store should be called with target argument", () => {
    expect(
      owner.store
    ).toHaveBeenCalledWith(target);
  });

  test("after should be called with 1, 2, 3", () => {
    expect(
      after
    ).toHaveBeenCalledWith(1, 2, 3);
  });
});
