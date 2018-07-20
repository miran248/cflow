import Actionable from "./Actionable";

export default class Reusable extends Actionable {
  owner = null;

  constructor(before, after) {
    super(before, after);
  }

  reuse = (params) => this.perform(params, () => {});
}
