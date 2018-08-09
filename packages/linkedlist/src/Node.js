import decorate, {
  get,
  has,
  Linkable,
  Recyclable,
  Replacable,
  Reusable,
  Serializable,
  Shareable,
} from "@cflow/decorators";

export default class Node {
  data = null;

  constructor() {
    decorate(this, [
      new Linkable,
      new Replacable,
      new Reusable(
        (data) => {
          this.data = data;
          data.owner = this;

          get(this.data, Shareable).retain();
        }
      ),
      new Recyclable(
        () => {
          const link = get(this, Linkable);

          if(link.parent)
            link.parent.detach(this);

          this.data = get(this.data, Shareable).release();
        }
      ),
      new Serializable(
        () => get(this.data, Serializable).serialize()
      ),
    ]);
  }

  valueOf() {
    return this.data.valueOf();
  }
}
