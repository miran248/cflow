import Decorator from "./Decorator";

export default class Linkable extends Decorator {
  parent = null;

  next = null;

  prev = null;
}
