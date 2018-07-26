"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Actionable2 = require("./Actionable");

var _Actionable3 = _interopRequireDefault(_Actionable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Recyclable = function (_Actionable) {
  _inherits(Recyclable, _Actionable);

  function Recyclable(before, after) {
    _classCallCheck(this, Recyclable);

    var _this = _possibleConstructorReturn(this, (Recyclable.__proto__ || Object.getPrototypeOf(Recyclable)).call(this, before, after));

    _this.owner = null;

    _this.recycle = function () {
      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      var owner = _this.owner;


      if (!owner) throw new Error("owner is required");

      _this[_Actionable2.action].apply(_this, [function () {
        return owner.store(_this.target);
      }].concat(params));
    };

    return _this;
  }

  return Recyclable;
}(_Actionable3.default);

exports.default = Recyclable;