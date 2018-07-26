"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var define = function define(decoratorClass) {
  if (key in decoratorClass) return;

  decoratorClass[key] = Symbol(decoratorClass.name);
};

var decorate = exports.decorate = Symbol("decorate");
var key = exports.key = Symbol("key");

var Decorator = function Decorator() {
  var _this = this;

  _classCallCheck(this, Decorator);

  this.target = null;

  this[decorate] = function (target) {
    _this.target = target;

    target[_this.constructor[key]] = _this;
  };

  define(this.constructor);
};

exports.default = Decorator;