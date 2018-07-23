import Decorator, {
  decorate, key
} from "../src/Decorator";

class DecoratedObject { }

describe("decorators/Decorator", () => {
  const target = new DecoratedObject;

  const decorator = new Decorator;

  test("Decorator[key].toString() should equal 'Symbol(Decorator)'", () => {
    expect(
      Decorator[key].toString()
    ).toBe("Symbol(Decorator)");
  });

  test("decorator.target should be null", () => {
    expect(
      decorator.target
    ).toBe(null);
  });

  test("decorator[decorate](target) should return undefined", () => {
    expect(
      decorator[decorate](target)
    ).toBeUndefined();
  });

  test("decorator.target should equal target", () => {
    expect(
      decorator.target
    ).toBe(target);
  });

  test("target[Decorator[key]] should equal decorator", () => {
    expect(
      target[Decorator[key]]
    ).toBe(decorator);
  });
});
