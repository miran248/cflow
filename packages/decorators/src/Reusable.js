import Actionable, { action } from "./Actionable";

export default class Reusable extends Actionable {
  owner = null;

  constructor(before, after) {
    super(before, after);
  }

  reuse = (...params) => this[action](
    () => {},
    ...params
  );
}
