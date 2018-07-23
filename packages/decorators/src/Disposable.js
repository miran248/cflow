import Actionable, { action } from "./Actionable";

export default class Disposable extends Actionable {
  constructor(before, after) {
    super(before, after);
  }

  dispose = (...params) => this[action](
    () => {
      console.log("TODO: Disposable dispose: perform cleanup!");
    },
    ...params
  );
}
