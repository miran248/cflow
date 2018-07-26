"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Service2 = require("./Service");

var _Service3 = _interopRequireDefault(_Service2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_Service) {
  _inherits(Container, _Service);

  function Container() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var dependable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var services = arguments[2];

    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, key, dependable));

    _this.services = null;
    _this.dependencies = {};

    _this.terminate = function () {
      return Promise.resolve(_this.ready).then(function () {
        return _this._stop();
      });
    };

    _this.services = services;

    _this.container = _this;

    process.once("SIGTERM", _this.terminate);
    process.once("SIGINT", _this.terminate);
    return _this;
  }

  _createClass(Container, [{
    key: "start",
    value: function start() {
      return this.services;
    }
  }, {
    key: "register",
    value: function register(key, value) {
      this.dependencies[key] = value;
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.dependencies[key];
    }
  }, {
    key: "resolveDependency",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key) {
        var dependencies, owner, dependency;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dependencies = this.dependencies, owner = this.owner;
                dependency = dependencies[key];

                if (dependency) {
                  _context.next = 6;
                  break;
                }

                if (owner) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                return _context.abrupt("return", owner.container.resolveDependency(key));

              case 6:
                _context.next = 8;
                return Promise.resolve(dependency.ready);

              case 8:
                return _context.abrupt("return", dependency);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function resolveDependency(_x3) {
        return _ref.apply(this, arguments);
      }

      return resolveDependency;
    }()
  }, {
    key: "run",
    value: function run() {
      var _this2 = this;

      return this._start(null).catch(function (error) {
        console.log("Container#run error", error);

        return _this2._stop();
      });
    }
  }]);

  return Container;
}(_Service3.default);

exports.default = Container;