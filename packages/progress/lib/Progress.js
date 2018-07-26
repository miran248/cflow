"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Progress = function () {
  function Progress() {
    _classCallCheck(this, Progress);

    this.total = 0;
    this.value = 0;
  }

  _createClass(Progress, [{
    key: "eta",
    value: function eta(rate) {
      var remaining = this.total - this.value;

      return Math.ceil(remaining / rate / 1000) || 0;
    }
  }, {
    key: "ratio",
    value: function ratio() {
      if (!this.total) return 1;

      return Math.min(1, Math.max(0, this.value / this.total));
    }
  }]);

  return Progress;
}();

exports.default = Progress;