import Decorator, {
  decorate, key
} from "../src/Decorator";

import Serializable from "../src/Serializable";

class DecoratedObject { }

describe("decorators/Serializable", () => {
  const operation = jest.fn().mockReturnValue(123);

  const target = new DecoratedObject;

  const decorator = new Serializable(
    operation
  );

  decorator[decorate](target);

  test("Serializable[key].toString() should equal 'Symbol(Serializable)'", () => {
    expect(
      Serializable[key].toString()
    ).toBe("Symbol(Serializable)");
  });

  test("decorator.operation should equal operation", () => {
    expect(
      decorator.operation
    ).toBe(operation);
  });

  test("decorator.serialize() should return 123", () => {
    expect(
      decorator.serialize()
    ).toBe(123);
  });

  test("operation should be called without params", () => {
    expect(
      operation
    ).toHaveBeenCalledWith();
  });
});
