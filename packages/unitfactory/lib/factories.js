"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stats = exports.factorize = exports.factory = undefined;

var _UnitFactory = require("./UnitFactory");

var _UnitFactory2 = _interopRequireDefault(_UnitFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var factories = {};

var factory = exports.factory = function factory(key) {
  if (!key) throw new Error("key is required");

  if (!(key in factories)) throw new Error(key + " factory undefined");

  return factories[key];
};

var factorize = exports.factorize = function factorize(key, Class) {
  if (!key) throw new Error("key is required");

  if (!Class) throw new Error("Class is required");

  if (key in factories) throw new Error(key + " factory already defined");

  return factories[key] = new _UnitFactory2.default(Class);
};

var stats = exports.stats = function stats() {
  return Object.keys(factories).filter(function (key) {
    return factories[key].created;
  }).map(function (key) {
    return key + ": " + factories[key].pool.length + "/" + factories[key].created;
  }).join(", ");
};