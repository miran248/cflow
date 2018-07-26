"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _decorators = require("@cflow/decorators");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UnitFactory = function () {
  function UnitFactory(T) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, UnitFactory);

    this.T = null;
    this.pool = null;
    this.created = 0;

    this.T = T;

    this.pool = [];

    this.produce(count);
  }

  _createClass(UnitFactory, [{
    key: "produce",
    value: function produce(count) {
      for (var i = 0; i < count; ++i) {
        this.pool.push(this.create());
      }
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.pool.length === 0;
    }
  }, {
    key: "count",
    value: function count() {
      return this.pool.length;
    }
  }, {
    key: "take",
    value: function take() {
      var _get;

      var item = this._take();

      if ((0, _decorators.has)(item, _decorators.Reusable)) (_get = (0, _decorators.get)(item, _decorators.Reusable)).reuse.apply(_get, arguments);

      return item;
    }
  }, {
    key: "_take",
    value: function _take() {
      if (this.isEmpty()) this.produce(10);

      return this.pool.shift();
    }
  }, {
    key: "store",
    value: function store(item) {
      this.pool.push(item);
    }

    // protected

  }, {
    key: "create",
    value: function create() {
      var item = new this.T();

      if ((0, _decorators.has)(item, _decorators.Recyclable)) (0, _decorators.get)(item, _decorators.Recyclable).owner = this;

      ++this.created;

      return item;
    }
  }]);

  return UnitFactory;
}();

exports.default = UnitFactory;