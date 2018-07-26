"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.action = undefined;

var _Decorator2 = require("./Decorator");

var _Decorator3 = _interopRequireDefault(_Decorator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var action = exports.action = Symbol("action");

var Actionable = function (_Decorator) {
  _inherits(Actionable, _Decorator);

  function Actionable(before, after) {
    _classCallCheck(this, Actionable);

    var _this = _possibleConstructorReturn(this, (Actionable.__proto__ || Object.getPrototypeOf(Actionable)).call(this));

    _this.before = null;
    _this.after = null;

    _this[action] = function (action) {
      for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      if (_this.before) _this.before.apply(_this, params);

      action();

      if (_this.after) _this.after.apply(_this, params);
    };

    _this.before = before;
    _this.after = after;
    return _this;
  }

  return Actionable;
}(_Decorator3.default);

exports.default = Actionable;