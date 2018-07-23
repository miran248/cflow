const define = (decoratorClass) => {
  if(key in decoratorClass)
    return;

  decoratorClass[key] = Symbol(decoratorClass.name);
};

export const decorate = Symbol("decorate");
export const key = Symbol("key");

export default class Decorator {
  target = null;

  constructor() {
    define(this.constructor);
  }

  [decorate] = (target) => {
    this.target = target;

    target[this.constructor[key]] = this;
  };
}
