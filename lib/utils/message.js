'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.success = exports.error = undefined;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = exports.error = function error(message) {
  console.log(_chalk2.default.red('Fail!') + ' ' + message);
};

var success = exports.success = function success(message) {
  console.log(_chalk2.default.green('Success!') + ' ' + message);
};