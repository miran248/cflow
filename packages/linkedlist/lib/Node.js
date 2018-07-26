"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _decorators = require("@cflow/decorators");

var _decorators2 = _interopRequireDefault(_decorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
  function Node() {
    var _this = this;

    _classCallCheck(this, Node);

    this.data = null;

    (0, _decorators2.default)(this, [new _decorators.Linkable(), new _decorators.Replacable(), new _decorators.Reusable(function (data) {
      _this.data = data;
      data.owner = _this;

      (0, _decorators.get)(_this.data, _decorators.Shareable).retain();
    }), new _decorators.Recyclable(function () {
      var link = (0, _decorators.get)(_this, _decorators.Linkable);

      if (link.parent) link.parent.detach(_this);

      _this.data = (0, _decorators.get)(_this.data, _decorators.Shareable).release();
    }), new _decorators.Serializable(function () {
      return (0, _decorators.get)(_this.data, _decorators.Serializable).serialize();
    })]);
  }

  _createClass(Node, [{
    key: "valueOf",
    value: function valueOf() {
      return this.data.valueOf();
    }
  }]);

  return Node;
}();

exports.default = Node;