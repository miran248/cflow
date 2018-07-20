import {
  get, has, Recyclable, Reusable,
} from "@cflow/decorators";

export default class UnitFactory {
  T = null;

  pool = null;

  created = 0;

  constructor(T, count = 0) {
    this.T = T;

    this.pool = [];

    this.produce(count);
  }

  produce(count) {
    for(let i = 0; i < count; ++i)
      this.pool.push(this.create());
  }

  isEmpty() {
    return this.pool.length === 0;
  }

  take(...params) {
    const item = this.takeWithoutParams();

    if(has(item, Reusable))
      get(item, Reusable).reuse(params);

    return item;
  }

  takeWithoutParams() {
    if(this.isEmpty())
      this.produce(10);

    return this.pool.shift();
  }

  store(item) {
    this.pool.push(item);
  }

  // protected
  create() {
    const item = new this.T();

    get(item, Recyclable).owner = this;

    ++this.created;

    return item;
  }
}
