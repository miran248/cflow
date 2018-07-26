import UnitFactory from "./UnitFactory";

const factories = {};

export const factory = (key) => {
  if(!key)
    throw new Error("key is required");

  if(!(key in factories))
    throw new Error(`${key} factory undefined`);

  return factories[key];
};

export const factorize = (key, Class) => {
  if(!key)
    throw new Error("key is required");

  if(!Class)
    throw new Error("Class is required");

  if(key in factories)
    throw new Error(`${key} factory already defined`);

  return factories[key] = new UnitFactory(Class);
};

export const stats = () => Object.keys(factories)
  .filter(
    (key) => factories[key].created
  )
  .map(
    (key) => `${key}: ${factories[key].pool.length}/${factories[key].created}`
  )
  .join(", ");
