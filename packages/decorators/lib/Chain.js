"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Decorator2 = require("./Decorator");

var _Decorator3 = _interopRequireDefault(_Decorator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chain = function (_Decorator) {
  _inherits(Chain, _Decorator);

  function Chain(links) {
    var resetCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Chain);

    var _this = _possibleConstructorReturn(this, (Chain.__proto__ || Object.getPrototypeOf(Chain)).call(this));

    _this.links = null;
    _this.resetCallback = null;
    _this.index = 0;


    _this.links = links;
    _this.resetCallback = resetCallback;
    return _this;
  }

  _createClass(Chain, [{
    key: "reset",
    value: function reset() {
      this.set(0);

      if (this.resetCallback) this.resetCallback();
    }
  }, {
    key: "next",
    value: function next() {
      return this.set(this.index + 1);
    }
  }, {
    key: "set",
    value: function set(index) {
      if (index >= this.links.length) return false;

      this.index = index;

      return true;
    }
  }, {
    key: "run",
    value: function run() {
      var _links;

      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      return (_links = this.links)[this.index].apply(_links, [this].concat(params));
    }
  }]);

  return Chain;
}(_Decorator3.default);

exports.default = Chain;