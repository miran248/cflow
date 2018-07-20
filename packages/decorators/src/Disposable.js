import Actionable from "./Actionable";

export default class Disposable extends Actionable {
  constructor(before, after) {
    super(before, after);
  }

  dispose = () => this.perform(null, () => {
    console.log("TODO: Disposable dispose: perform cleanup!");
  });
}
