import UnitFactory from "./UnitFactory";

const factories = {};

export const factory = (key) => factories[key];
export const factorize = (key, Class) => factories[key] = new UnitFactory(Class);

export const stats = () => Object.keys(factories)
  .filter(
    (key) => factories[key].created
  )
  .map(
    (key) => `${key}: ${factories[key].pool.length}/${factories[key].created}`
  )
  .join(", ");
