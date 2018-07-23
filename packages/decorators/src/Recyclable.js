import Actionable, { action } from "./Actionable";

export default class Recyclable extends Actionable {
  owner = null;

  constructor(before, after) {
    super(before, after);
  }

  recycle = (...params) => {
    const { owner } = this;

    if(!owner)
      throw new Error("owner is required");

    this[action](
      () => owner.store(this.target),
      ...params
    );
  };
}
