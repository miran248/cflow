import Decorator from "./Decorator";

export default class Serializable extends Decorator {
  operation = null;

  constructor(operation) {
    super();

    this.operation = operation;
  }

  serialize = () => this.operation();
}
