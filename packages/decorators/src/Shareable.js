import {
  get, has, Recyclable,
} from "./index";

import Decorator from "./Decorator";

export default class Shareable extends Decorator {
  owner = null;

  count = 0;

  retain = () => {
    ++this.count;
  };

  release = () => {
    --this.count;

    if(this.owner && this.count === 1)
      return get(this.owner, Recyclable).recycle();

    if(this.count > 0)
      return;

    this.owner = null;

    if(has(this.target, Recyclable))
      return get(this.target, Recyclable).recycle();
  };
}
