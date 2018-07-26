"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _decorators = require("@cflow/decorators");

var _decorators2 = _interopRequireDefault(_decorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinkedList = function () {
  function LinkedList() {
    var _this = this;

    _classCallCheck(this, LinkedList);

    this.head = null;
    this.tail = null;
    this.count = 0;

    (0, _decorators2.default)(this, [new _decorators.Linkable(), new _decorators.Recyclable(function () {
      var node = null;

      while (_this.head) {
        node = _this.detachHead();

        (0, _decorators.get)(node, _decorators.Recyclable).recycle();
      }
    })]);
  }

  _createClass(LinkedList, [{
    key: "isEmpty",
    value: function isEmpty() {
      return !this.head;
    }
  }, {
    key: "attach",
    value: function attach(item) {
      var itemLink = (0, _decorators.get)(item, _decorators.Linkable);

      itemLink.parent = this;
      itemLink.prev = this.tail;

      if (!this.head) this.head = item;

      if (this.tail) (0, _decorators.get)(this.tail, _decorators.Linkable).next = item;

      this.tail = item;

      ++this.count;

      return item;
    }
  }, {
    key: "attachBefore",
    value: function attachBefore(item, target) {
      var itemLink = (0, _decorators.get)(item, _decorators.Linkable);
      var targetLink = (0, _decorators.get)(target, _decorators.Linkable);

      itemLink.parent = this;
      itemLink.next = target;
      itemLink.prev = targetLink.prev;
      targetLink.prev = item;

      if (!itemLink.prev) this.head = item;else (0, _decorators.get)(itemLink.prev, _decorators.Linkable).next = item;

      ++this.count;

      return item;
    }
  }, {
    key: "attachAfter",
    value: function attachAfter(item, target) {
      var itemLink = (0, _decorators.get)(item, _decorators.Linkable);
      var targetLink = (0, _decorators.get)(target, _decorators.Linkable);

      itemLink.parent = this;
      itemLink.prev = target;
      itemLink.next = targetLink.next;
      targetLink.next = item;

      if (!itemLink.next) this.tail = item;else (0, _decorators.get)(itemLink.next, _decorators.Linkable).prev = item;

      ++this.count;

      return item;
    }
  }, {
    key: "detachTail",
    value: function detachTail() {
      var item = this.tail;

      var itemLink = (0, _decorators.get)(item, _decorators.Linkable);
      this.tail = itemLink.prev;
      itemLink.prev = null;
      itemLink.parent = null;

      if (this.tail) (0, _decorators.get)(this.tail, _decorators.Linkable).next = null;else this.head = null;

      --this.count;

      return item;
    }
  }, {
    key: "detachHead",
    value: function detachHead() {
      var item = this.head;

      var itemLink = (0, _decorators.get)(item, _decorators.Linkable);
      this.head = itemLink.next;
      itemLink.next = null;
      itemLink.parent = null;

      if (this.head) (0, _decorators.get)(this.head, _decorators.Linkable).prev = null;else this.tail = null;

      --this.count;

      return item;
    }
  }, {
    key: "detach",
    value: function detach(item) {
      var itemLink = (0, _decorators.get)(item, _decorators.Linkable);

      if (itemLink.prev) (0, _decorators.get)(itemLink.prev, _decorators.Linkable).next = itemLink.next;else this.head = itemLink.next;

      if (itemLink.next) (0, _decorators.get)(itemLink.next, _decorators.Linkable).prev = itemLink.prev;else this.tail = itemLink.prev;

      itemLink.prev = null;
      itemLink.next = null;
      itemLink.parent = null;

      --this.count;

      return item;
    }

    // [Symbol.iterator]() {
    //   var item = this.head;
    //
    //   return {
    //     next() {
    //       return {
    //         value: item,
    //         done: !item || !(item = get(item, Linkable).next),
    //       };
    //     },
    //   };
    // }

  }]);

  return LinkedList;
}();

exports.default = LinkedList;