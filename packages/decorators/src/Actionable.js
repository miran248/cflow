import Decorator from "./Decorator";

export const action = Symbol("action");

export default class Actionable extends Decorator {
  before = null;
  after = null;

  constructor(before, after) {
    super();

    this.before = before;
    this.after = after;
  }

  [action] = (action, ...params) => {
    if(this.before)
      this.before(...params);

    action();

    if(this.after)
      this.after(...params);
  }
}
