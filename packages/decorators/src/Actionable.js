import Decorator from "./Decorator";

export default class Actionable extends Decorator {
  before = null;

  after = null;

  constructor(before, after) {
    super();

    this.before = before;
    this.after = after;
  }

  perform = (params, action) => {
    if(this.before) {
      if(params)
        this.before(...params);
      else
        this.before();
    }

    action();

    if(this.after) {
      if(params)
        this.after(...params);
      else
        this.after();
    }
  };
}
