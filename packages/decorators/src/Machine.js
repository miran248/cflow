import Decorator from "./Decorator";

export default class Machine extends Decorator {
  states = null;

  current = null;

  currentKey = null;

  constructor(states) {
    super();

    this.states = states;
  }

  set(key) {
    this.currentKey = key;

    const { current } = this;

    const state = key && this.states[key];

    if(current && current.end)
      current.end();

    this.current = state;

    if(state && state.begin)
      state.begin();

    return true;
  }

  run(value) {
    if(this.current.tick)
      this.current.tick(value);
  }
}

Machine.State = class State {
  begin = null;

  tick = null;

  end = null;

  constructor(begin, tick, end) {
    this.begin = begin;
    this.tick = tick;
    this.end = end;
  }
};
