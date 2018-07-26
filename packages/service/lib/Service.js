"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
    n = frames.length;

// "◝", "◞", "◟", "◜"

function spinner() {
  var i = 0;

  return function () {
    return frames[i = (i + 1) % n];
  };
}

var green = _chalk2.default.hex("#67EF45");
var red = _chalk2.default.hex("#EF6745");

var Service = function () {
  function Service() {
    var _this = this;

    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var dependable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Service);

    this.key = null;
    this.dependable = false;
    this.events = null;
    this.container = null;
    this.nestedServices = [];
    this.statusCode = 0;
    this.ready = null;
    this.spinner = null;
    this._owner = null;

    this._status = function () {
      return [].concat(_toConsumableArray(_this.status().map(function (status) {
        if (_this.statusCode == 0) return green("●") + " " + status;

        if (_this.statusCode == 1) return green(_this.spinner()) + " " + status;

        if (_this.statusCode == 2) return green("✔") + " " + status;

        if (_this.statusCode == 3) return red(_this.spinner()) + " " + status;

        if (_this.statusCode == 4) return red("●") + " " + status;
      })), _toConsumableArray(_this.statusItems().map(function (status) {
        return " " + status;
      })));
    };

    this.startItem = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(item) {
        var items;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                items = _this.nestedServices;


                items.push(item);

                _context.next = 4;
                return item._start(_this);

              case 4:
                return _context.abrupt("return", item);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x3) {
        return _ref.apply(this, arguments);
      };
    }();

    this.stopItem = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item) {
        var items, index;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                items = _this.nestedServices;
                index = items.indexOf(item);

                if (!(index < 0)) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return");

              case 4:

                items.splice(index, 1);

                _context2.next = 7;
                return item._stop();

              case 7:
                return _context2.abrupt("return", item);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x4) {
        return _ref2.apply(this, arguments);
      };
    }();

    this.stopSelf = function () {
      return _this.owner.notify("stopItem", _this);
    };

    this.notify = function (event, payload) {
      return _this.events.emit(event, payload);
    };

    this.key = key;
    this.dependable = dependable;

    this.events = new _events2.default();

    this.spinner = spinner();

    // const self = this;
    //
    // return new Proxy(this, {
    //   get: (target, key, receiver) => {
    //     if(typeof key !== "string"
    //     || key in target)
    //       return Reflect.get(target, key, target); // return target[key];
    //
    //     return Reflect.get(self.nestedServices, key, self.nestedServices); // return self.nestedServices[key];
    //   }
    // });
  }

  _createClass(Service, [{
    key: "requirements",
    value: function requirements() {
      return [];
    }
  }, {
    key: "start",
    value: function start() {
      return null;
    }
  }, {
    key: "started",
    value: function started() {}
  }, {
    key: "stop",
    value: function stop() {}
  }, {
    key: "status",
    value: function status() {
      return [];
    }

    // TODO: Remove me!

  }, {
    key: "serialize",
    value: function serialize(selector, options) {
      return null;
    }
  }, {
    key: "startAction",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(owner) {
        var dependencies;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (owner) this.owner = owner;

                if (this.dependable && this.key) this.container.register(this.key, this);

                this.events.on("stopItem", this.stopItem);

                _context3.next = 5;
                return this.resolveDependencies();

              case 5:
                dependencies = _context3.sent;


                this.statusCode = 1;

                _context3.next = 9;
                return this.start(dependencies);

              case 9:
                _context3.t0 = _context3.sent;

                if (_context3.t0) {
                  _context3.next = 12;
                  break;
                }

                _context3.t0 = [];

              case 12:
                this.nestedServices = _context3.t0;
                _context3.next = 15;
                return this.startItems();

              case 15:

                this.statusCode = 2;

                _context3.next = 18;
                return this.started(dependencies);

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function startAction(_x5) {
        return _ref3.apply(this, arguments);
      }

      return startAction;
    }()
  }, {
    key: "_start",
    value: function _start(owner) {
      return this.ready = this.startAction(owner);
    }
  }, {
    key: "_stop",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.ready = null;

                this.statusCode = 3;

                this.events.removeAllListeners();

                _context4.next = 5;
                return this.stopItems();

              case 5:
                _context4.next = 7;
                return this.stop();

              case 7:

                this.statusCode = 4;

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _stop() {
        return _ref4.apply(this, arguments);
      }

      return _stop;
    }()
  }, {
    key: "startItems",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this2 = this;

        var items;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                items = this.nestedServices;
                _context5.next = 3;
                return Promise.all(items.map(function (item) {
                  return item._start(_this2);
                }));

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function startItems() {
        return _ref5.apply(this, arguments);
      }

      return startItems;
    }()
  }, {
    key: "stopItems",
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var items, item;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                items = this.nestedServices;
                item = null;

              case 2:
                if (!(item = items.pop())) {
                  _context6.next = 7;
                  break;
                }

                _context6.next = 5;
                return item._stop();

              case 5:
                _context6.next = 2;
                break;

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function stopItems() {
        return _ref6.apply(this, arguments);
      }

      return stopItems;
    }()
  }, {
    key: "statusItems",
    value: function statusItems() {
      var items = this.nestedServices;

      return items.reduce(function (memo, item) {
        return [].concat(_toConsumableArray(memo), _toConsumableArray(item._status()));
      }, []);
    }
  }, {
    key: "resolveDependencies",
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this3 = this;

        var requirements, dependencies;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                requirements = this.requirements();
                dependencies = {};
                _context7.next = 4;
                return Promise.all(requirements.map(function (requirement) {
                  return _this3.container.resolveDependency(requirement).then(function (dependency) {
                    return dependencies[requirement] = dependency;
                  });
                }));

              case 4:
                return _context7.abrupt("return", dependencies);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function resolveDependencies() {
        return _ref7.apply(this, arguments);
      }

      return resolveDependencies;
    }()
  }, {
    key: "at",
    value: function at(index) {
      return this.nestedServices[index];
    }
  }, {
    key: "get",


    // [Symbol.iterator]() { return this.nestedServices; }
    value: function get(key) {
      return this.container.get(key);
    }
  }, {
    key: "owner",
    get: function get() {
      return this._owner;
    },
    set: function set(value) {
      this._owner = value;

      this.container = value.container;
    }
  }]);

  return Service;
}();

exports.default = Service;