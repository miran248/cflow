import {
  get, has, Disposable, Recyclable, Reusable, Shareable,
} from "./index";

import Decorator from "./Decorator";

export default class Replacable extends Decorator {
  replace = (...params) => {
    const { target } = this;

    if(target.data) {
      if(has(target, Shareable))
        get(target, Shareable).release();
      else if(has(target, Recyclable))
        get(target, Recyclable).recycle();
      else if(has(target, Disposable))
        get(target, Disposable).dispose();
    }

    if(has(target, Reusable))
      get(target, Reusable).reuse(...params);
  };
}
