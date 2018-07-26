import decorate, {
  get,
  Recyclable,
  Reusable,
} from "@cflow/decorators";

import UnitFactory from "../src/UnitFactory";

class Item {
  constructor() {
    decorate(this, [
      new Recyclable(jest.fn()),
      new Reusable(jest.fn()),
    ]);
  }
}

describe("unitfactory/UnitFactory", () => {
  const factory = new UnitFactory(Item);

  var items = [];
  var item = null;

  test("factory.created should equal 0", () => {
    expect(
      factory.created
    ).toBe(0);
  });

  test("factory.count() should return 0", () => {
    expect(
      factory.count()
    ).toBe(0);
  });

  test("factory.isEmpty() should return true", () => {
    expect(
      factory.isEmpty()
    ).toBe(true);
  });

  test("factory.produce(10) should return undefined", () => {
    expect(
      factory.produce(10)
    ).toBeUndefined();
  });

  test("factory.created should equal 10", () => {
    expect(
      factory.created
    ).toBe(10);
  });

  test("factory.count() should return 10", () => {
    expect(
      factory.count()
    ).toBe(10);
  });

  test("factory.isEmpty() should return false", () => {
    expect(
      factory.isEmpty()
    ).toBe(false);
  });

  test("factory._take() should return Item instance", () => {
    const temp = factory.pool[0];

    expect(
      item = factory._take()
    ).toBe(temp);

    items.push(item);
  });

  test("get(item, Reusable).before should not be called", () => {
    expect(
      get(item, Reusable).before
    ).not.toHaveBeenCalledWith();
  });

  test("factory.created should equal 10", () => {
    expect(
      factory.created
    ).toBe(10);
  });

  test("factory.count() should return 9", () => {
    expect(
      factory.count()
    ).toBe(9);
  });

  test("get(item, Recyclable).owner should equal factory", () => {
    expect(
      get(item, Recyclable).owner
    ).toBe(factory);
  });

  test("factory.take() should return Item instance", () => {
    const temp = factory.pool[0];

    expect(
      item = factory.take()
    ).toBe(temp);

    items.push(item);
  });

  test("get(item, Reusable).before should be called without params", () => {
    expect(
      get(item, Reusable).before
    ).toHaveBeenCalledWith();
  });

  test("factory.count() should return 8", () => {
    expect(
      factory.count()
    ).toBe(8);
  });

  test("get(item, Recyclable).owner should equal factory", () => {
    expect(
      get(item, Recyclable).owner
    ).toBe(factory);
  });

  test("factory.take(1, 2, 3) should return Item instance", () => {
    const temp = factory.pool[0];

    expect(
      item = factory.take(1, 2, 3)
    ).toBe(temp);

    items.push(item);
  });

  test("get(item, Reusable).before should be called with 1, 2, 3", () => {
    expect(
      get(item, Reusable).before
    ).toHaveBeenCalledWith(1, 2, 3);
  });

  test("factory.count() should return 7", () => {
    expect(
      factory.count()
    ).toBe(7);
  });

  test("get(item, Recyclable).owner should equal factory", () => {
    expect(
      get(item, Recyclable).owner
    ).toBe(factory);
  });

  test("factory.store(item) should return undefined", () => {
    expect(
      factory.store(item = items.pop())
    ).toBeUndefined();
  });

  test("get(item, Recyclable).before should not be called", () => {
    expect(
      get(item, Recyclable).before
    ).not.toHaveBeenCalledWith();
  });

  test("factory.count() should return 8", () => {
    expect(
      factory.count()
    ).toBe(8);
  });

  test("get(item, Recyclable).recycle() should return undefined", () => {
    expect(
      get(item = items.pop(), Recyclable).recycle()
    ).toBeUndefined();
  });

  test("get(item, Recyclable).before should be called without params", () => {
    expect(
      get(item, Recyclable).before
    ).toHaveBeenCalledWith();
  });

  test("factory.count() should return 9", () => {
    expect(
      factory.count()
    ).toBe(9);
  });

  test("get(item, Recyclable).recycle(1, 2, 3) should return undefined", () => {
    expect(
      get(item = items.pop(), Recyclable).recycle(1, 2, 3)
    ).toBeUndefined();
  });

  test("get(item, Recyclable).before should be called with 1, 2, 3", () => {
    expect(
      get(item, Recyclable).before
    ).toHaveBeenCalledWith(1, 2, 3);
  });

  test("factory.count() should return 10", () => {
    expect(
      factory.count()
    ).toBe(10);
  });
});
