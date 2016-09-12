(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/helpers/typeof', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/helpers/typeof'), require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._typeof, global.regenerator, global.asyncToGenerator);
    global.angularAsyncAwait = mod.exports;
  }
})(this, function (exports, _typeof2, _regenerator, _asyncToGenerator2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof3 = _interopRequireDefault(_typeof2);

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * angular-async-await.js
   *
   * Summary: This module provides a service
   * that wraps user defined async functions,
   * and allows them to await operations that update
   * the view model without needing to manually trigger
   * a $digest cycle.
   *
   * Created by Ben Hansen on 2/16/16.
   *
   * To report an issue, please visit:
   * https://github.com/ben-hunter-hansen/angular-async-await/issues
   *
   */

  var $async = ['$rootScope', '$log', function ($rootScope, $log) {
    "use strict";

    return function (cb) {

      var validArgument = typeof cb === 'function';

      var wrapper = function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var _len,
              args,
              _key,
              _args = arguments;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;

                  for (_len = _args.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = _args[_key];
                  }

                  _context.next = 4;
                  return cb.call.apply(cb, [this].concat(args));

                case 4:
                  _context.next = 9;
                  break;

                case 6:
                  _context.prev = 6;
                  _context.t0 = _context['catch'](0);

                  $log.error(_context.t0);

                case 9:
                  _context.prev = 9;

                  $rootScope.$apply();
                  return _context.finish(9);

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 6, 9, 12]]);
        }));

        return function wrapper(_x) {
          return _ref.apply(this, arguments);
        };
      }();

      if (!validArgument) {
        $log.error('$async expects a function argument, got ' + (typeof cb === 'undefined' ? 'undefined' : (0, _typeof3.default)(cb)));
      }

      return validArgument ? wrapper : function () {/* noop */};
    };
  }];

  exports.default = angular.module('angular-async-await', []).factory('$async', $async);
});
