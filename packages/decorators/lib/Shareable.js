"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./index");

var _Decorator2 = require("./Decorator");

var _Decorator3 = _interopRequireDefault(_Decorator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shareable = function (_Decorator) {
  _inherits(Shareable, _Decorator);

  function Shareable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Shareable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Shareable.__proto__ || Object.getPrototypeOf(Shareable)).call.apply(_ref, [this].concat(args))), _this), _this.owner = null, _this.count = 0, _this.retain = function () {
      ++_this.count;
    }, _this.release = function () {
      --_this.count;

      if (_this.owner && _this.count === 1 && (0, _index.has)(_this.owner, _index.Recyclable)) return (0, _index.get)(_this.owner, _index.Recyclable).recycle();

      if (_this.count > 0) return;

      _this.owner = null;

      if ((0, _index.has)(_this.target, _index.Recyclable)) return (0, _index.get)(_this.target, _index.Recyclable).recycle();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Shareable;
}(_Decorator3.default);

exports.default = Shareable;