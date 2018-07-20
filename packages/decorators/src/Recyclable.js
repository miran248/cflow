import Actionable from "./Actionable";

export default class Recyclable extends Actionable {
  owner = null;

  constructor(before, after) {
    super(before, after);
  }

  recycle = () => this.perform(null, () => this.owner.store(this.target));
}
