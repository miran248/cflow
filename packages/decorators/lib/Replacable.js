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

var Replacable = function (_Decorator) {
  _inherits(Replacable, _Decorator);

  function Replacable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Replacable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Replacable.__proto__ || Object.getPrototypeOf(Replacable)).call.apply(_ref, [this].concat(args))), _this), _this.replace = function () {
      var _get;

      var _this2 = _this,
          target = _this2.target;


      if (target.data) {
        if ((0, _index.has)(target, _index.Shareable)) (0, _index.get)(target, _index.Shareable).release();else if ((0, _index.has)(target, _index.Recyclable)) (0, _index.get)(target, _index.Recyclable).recycle();else if ((0, _index.has)(target, _index.Disposable)) (0, _index.get)(target, _index.Disposable).dispose();
      }

      if ((0, _index.has)(target, _index.Reusable)) (_get = (0, _index.get)(target, _index.Reusable)).reuse.apply(_get, arguments);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Replacable;
}(_Decorator3.default);

exports.default = Replacable;