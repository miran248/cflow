import {
  decorate, key,
} from "./Decorator";

export { default as Chain } from "./Chain";
export { default as Disposable } from "./Disposable";
export { default as Linkable } from "./Linkable";
export { default as Recyclable } from "./Recyclable";
export { default as Replacable } from "./Replacable";
export { default as Reusable } from "./Reusable";
export { default as Serializable } from "./Serializable";
export { default as Shareable } from "./Shareable";

export const get = (target, decoratorClass) => {
  if(!has(target, decoratorClass))
    throw new Error(`${target.constructor.name} is not ${decoratorClass.name}`);

  return target[decoratorClass[key]];
};

export const has = (target, decoratorClass) => {
  if(!target)
    throw new Error("target is required");

  if(!decoratorClass)
    throw new Error("decoratorClass is required");

  return decoratorClass[key] in target;
};

export default (target, decorators) => {
  if(!target)
    throw new Error("target is required");

  if(!decorators)
    throw new Error("decorators is required");

  for(const decorator of decorators)
    decorator[decorate](target);
};
