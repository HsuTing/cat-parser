'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _process = require('process');

var _process2 = _interopRequireDefault(_process);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _json2csv = require('json2csv');

var _json2csv2 = _interopRequireDefault(_json2csv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = _path2.default.resolve(_process2.default.cwd(), './public/data');

var writeJson = function writeJson(name, data) {
  return new Promise(function (resolve, reject) {
    _fs2.default.writeFile(_path2.default.resolve(root, name, name + '.json'), JSON.stringify(data), 'utf8', function (err) {
      if (err) reject(name + '.json');else resolve(_chalk2.default.green('Success!') + ' ' + name + '.json');
    });
  });
};

var writeCsv = function writeCsv(name, data) {
  return new Promise(function (resolve, reject) {
    try {
      var fields = Object.keys(data[0]);
      var output = (0, _json2csv2.default)({ data: data, fields: fields });

      _fs2.default.writeFile(_path2.default.resolve(root, name, name + '.csv'), output, 'utf8', function (err) {
        if (err) reject(name + '.csv');else resolve(_chalk2.default.green('Success!') + ' ' + name + '.csv');
      });
    } catch (e) {
      reject(name + '.csv (convert fail)');
    }
  });
};

exports.default = function (name, data) {
  Promise.all([writeJson(name, data), writeCsv(name, data)]).then(function (tasks) {
    tasks.forEach(function (status) {
      return console.log(status);
    });
  }).catch(function (err) {
    return console.log(_chalk2.default.red('Fail!') + ' ' + err);
  });
};