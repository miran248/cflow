import {
  get, has, Disposable, Recyclable, Reusable, Shareable,
} from "./index";

import Decorator from "./Decorator";

export default class Replacable extends Decorator {
  replace = (...params) => {
    if(this.target.data) {
      if(has(this.target, Shareable))
        get(this.target, Shareable).release();
      else if(has(this.target, Recyclable))
        get(this.target, Recyclable).recycle();
      else if(has(this.target, Disposable))
        get(this.target, Disposable).dispose();
    }

    if(has(this.target, Reusable))
      get(this.target, Reusable).reuse(params);
  };
}
