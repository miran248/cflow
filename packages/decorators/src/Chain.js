import Decorator from "./Decorator";

export default class Chain extends Decorator {
  links = null;

  resetCallback = null;

  index = 0;

  constructor(links, resetCallback = null) {
    super();

    this.links = links;
    this.resetCallback = resetCallback;
  }

  reset() {
    this.set(0);

    if(this.resetCallback)
      this.resetCallback();
  }

  next() {
    return this.set(this.index + 1);
  }

  set(index) {
    if(index >= this.links.length)
      return false;

    this.index = index;

    return true;
  }

  run(...params) {
    return this.links[this.index](this, ...params);
  }
}
