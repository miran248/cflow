"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Eta = function () {
  function Eta() {
    _classCallCheck(this, Eta);

    this.buffer = [];
    this.samples = 10;
  }

  _createClass(Eta, [{
    key: "reset",
    value: function reset() {
      this.buffer = [];
    }
  }, {
    key: "sample",
    value: function sample(value) {
      this.buffer.push({
        time: Date.now(),
        value: value
      });
    }
  }, {
    key: "rate",
    value: function rate() {
      var l = this.buffer.length;
      var k = Math.min(this.samples, l);

      var a = this.buffer[l - 1];
      var b = this.buffer[l - k];

      this.buffer = this.buffer.slice(-this.samples);

      var time = a.time - b.time;
      var value = a.value - b.value;

      return value / time;
    }
  }]);

  return Eta;
}();

exports.default = Eta;