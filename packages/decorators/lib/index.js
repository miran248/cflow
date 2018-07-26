"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.has = exports.get = exports.Shareable = exports.Serializable = exports.Reusable = exports.Replacable = exports.Recyclable = exports.Linkable = exports.Disposable = exports.Chain = undefined;

var _Chain = require("./Chain");

Object.defineProperty(exports, "Chain", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Chain).default;
  }
});

var _Disposable = require("./Disposable");

Object.defineProperty(exports, "Disposable", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Disposable).default;
  }
});

var _Linkable = require("./Linkable");

Object.defineProperty(exports, "Linkable", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Linkable).default;
  }
});

var _Recyclable = require("./Recyclable");

Object.defineProperty(exports, "Recyclable", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Recyclable).default;
  }
});

var _Replacable = require("./Replacable");

Object.defineProperty(exports, "Replacable", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Replacable).default;
  }
});

var _Reusable = require("./Reusable");

Object.defineProperty(exports, "Reusable", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Reusable).default;
  }
});

var _Serializable = require("./Serializable");

Object.defineProperty(exports, "Serializable", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Serializable).default;
  }
});

var _Shareable = require("./Shareable");

Object.defineProperty(exports, "Shareable", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Shareable).default;
  }
});

var _Decorator = require("./Decorator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get = exports.get = function get(target, decoratorClass) {
  if (!has(target, decoratorClass)) throw new Error(target.constructor.name + " is not " + decoratorClass.name);

  return target[decoratorClass[_Decorator.key]];
};

var has = exports.has = function has(target, decoratorClass) {
  if (!target) throw new Error("target is required");

  if (!decoratorClass) throw new Error("decoratorClass is required");

  return decoratorClass[_Decorator.key] in target;
};

exports.default = function (target, decorators) {
  if (!target) throw new Error("target is required");

  if (!decorators) throw new Error("decorators is required");

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = decorators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var decorator = _step.value;

      decorator[_Decorator.decorate](target);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};