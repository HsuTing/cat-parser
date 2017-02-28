'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _csv = require('csv');

var _urlencode = require('urlencode');

var _urlencode2 = _interopRequireDefault(_urlencode);

var _getIndividualData = require('./getIndividualData');

var _getIndividualData2 = _interopRequireDefault(_getIndividualData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (choice) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(_path2.default.resolve(__dirname, './../../../data/landfill.csv'), function (readError, input) {
      if (readError) return reject(readError);

      (0, _csv.parse)(input, { comment: '#' }, function (parseError, output) {
        if (parseError) return reject(parseError);

        var individualTask = false;
        var tasks = output.slice(1).map(function (item, index) {
          var name = item[1];
          if (name === '') return;

          if (choice) {
            if (name === choice) individualTask = [(0, _getIndividualData2.default)(name, 'http://erdb.epa.gov.tw/DataRepository/Facilities/LandFillDetail.aspx?FacilityName=' + (0, _urlencode2.default)(name) + '&topic1=' + (0, _urlencode2.default)('地') + '&topic2=' + (0, _urlencode2.default)('設施') + '&subject=' + (0, _urlencode2.default)('廢棄物處理'))];

            return;
          }

          return (0, _getIndividualData2.default)(name, 'http://erdb.epa.gov.tw/DataRepository/Facilities/LandFillDetail.aspx?FacilityName=' + (0, _urlencode2.default)(name) + '&topic1=' + (0, _urlencode2.default)('地') + '&topic2=' + (0, _urlencode2.default)('設施') + '&subject=' + (0, _urlencode2.default)('廢棄物處理'));
        });

        resolve(individualTask || tasks.slice(1));
      });
    });
  });
};