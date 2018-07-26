"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Progress2 = require("./Progress");

var _Progress3 = _interopRequireDefault(_Progress2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function defaultStyle(complete, incomplete) {
  return complete + incomplete;
}

var AsciiProgress = function (_Progress) {
  _inherits(AsciiProgress, _Progress);

  function AsciiProgress() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AsciiProgress);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AsciiProgress.__proto__ || Object.getPrototypeOf(AsciiProgress)).call.apply(_ref, [this].concat(args))), _this), _this.width = 20, _this.style = defaultStyle, _this.incomplete = "▫", _this.complete = "▪", _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AsciiProgress, [{
    key: "render",
    value: function render() {
      var incomplete = Array(this.width + 1).join(this.incomplete);
      var complete = Array(this.width + 1).join(this.complete);

      var position = Math.floor(this.ratio() * this.width);

      return this.style(complete.slice(0, position * this.complete.length), incomplete.slice(position * this.incomplete.length));
    }
  }]);

  return AsciiProgress;
}(_Progress3.default);

exports.default = AsciiProgress;