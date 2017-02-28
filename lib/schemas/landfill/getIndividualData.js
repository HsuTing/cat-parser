'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

var _message = require('../../utils/message');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (name, url) {
  return new Promise(function (resolve) {
    _jsdom2.default.env({
      url: url,
      done: function done(err, window) {
        var output = {};

        if (err) {
          (0, _message.error)('can not get data from ' + name);
          return resolve(output);
        }

        var all = window.document.getElementById('meta');
        if (!all) {
          (0, _message.error)('can not parse data from ' + name);
          return resolve(output);
        }

        var trs = all.querySelectorAll('tr');

        Array.from(trs).forEach(function (tr) {
          var items = tr.querySelectorAll('td');

          if (items) {
            var key = '';
            Array.from(items).forEach(function (item) {
              if (!item.querySelector('div')) {
                if (item.querySelector('span')) output[key] = item.querySelector('span').innerHTML;else key = item.innerHTML;
              }
            });
          }
        });

        (0, _message.success)(name);
        resolve(output);
      }
    });
  });
};