"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var cancellable = exports.cancellable = function cancellable(operation) {
  var cancel = null;

  var cancellable = new Promise(function (resolve) {
    return cancel = resolve;
  });

  return {
    cancel: cancel,
    cancellable: cancellable,

    returnValue: operation(cancellable, cancel)
  };
};

var wait = exports.wait = function wait(delay) {
  return new Promise(function (resolve) {
    var timeout = setTimeout(function () {
      if (!timeout) return;

      timeout = clearTimeout(timeout);

      resolve();
    }, delay);
  });
};

var waitWhile = exports.waitWhile = function waitWhile(predicate, delay) {
  return new Promise(function (resolve) {
    var interval = setInterval(function () {
      if (predicate()) return;

      if (!interval) return;

      interval = clearInterval(interval);

      resolve();
    }, delay);
  });
};

var retry = exports.retry = function retry(operation) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var retries = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return new Promise(function (resolve, reject) {
    return operation().then(resolve).catch(function (error) {
      if (retries > 0) {
        return wait(delay).then(retry.bind(null, operation, delay * 2, retries - 1)).then(resolve).catch(reject);
      }

      return reject(error);
    });
  });
};

var runSequence = exports.runSequence = function runSequence(items, operation) {
  var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return items.reduce(function (memo, item) {
    return memo.then(function (state) {
      return operation(item, state);
    });
  }, Promise.resolve(state));
};

var runSequenceRight = exports.runSequenceRight = function runSequenceRight(items, operation) {
  var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return items.reduceRight(function (memo, item) {
    return memo.then(function (state) {
      return operation(item, state);
    });
  }, Promise.resolve(state));
};

var buffered = exports.buffered = function buffered(fn) {
  var pending = [];

  var processing = false;

  console.log("helpers buffered");

  var run = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!processing) {
                _context.next = 3;
                break;
              }

              pending.push(args);

              return _context.abrupt("return");

            case 3:

              processing = true;

              _context.next = 6;
              return fn.apply(undefined, _toConsumableArray(args));

            case 6:
              response = _context.sent;


              processing = false;

              if (!pending.length) {
                _context.next = 11;
                break;
              }

              _context.next = 11;
              return run.apply(undefined, _toConsumableArray(pending.shift()));

            case 11:
              return _context.abrupt("return", response);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function run() {
      return _ref.apply(this, arguments);
    };
  }();

  return run;
};