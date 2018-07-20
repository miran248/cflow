import Decorator from "./Decorator";

export default class Chain extends Decorator {
  links = null;

  resetCallback = null;

  index = 0;

  constructor(links, resetCallback) {
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
    this.set(this.index + 1);
  }

  set(index) {
    this.index = index;
  }

  run(value) {
    this.links[this.index](this, value);
  }
}
