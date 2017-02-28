'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _process = require('process');

var _process2 = _interopRequireDefault(_process);

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaMorgan = require('koa-morgan');

var _koaMorgan2 = _interopRequireDefault(_koaMorgan);

var _koaHelmet = require('koa-helmet');

var _koaHelmet2 = _interopRequireDefault(_koaHelmet);

var _koaCompress = require('koa-compress');

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _koaEtag = require('koa-etag');

var _koaEtag2 = _interopRequireDefault(_koaEtag);

var _koaMount = require('koa-mount');

var _koaMount2 = _interopRequireDefault(_koaMount);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaGraphql = require('koa-graphql');

var _koaGraphql2 = _interopRequireDefault(_koaGraphql);

var _schema = require('./schemas/schema');

var _schema2 = _interopRequireDefault(_schema);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
var root = _path2.default.resolve(__dirname, './../');
var ENV = _process2.default.env.NODE_ENV === 'production';

// middleware
if (ENV) app.use((0, _koaMorgan2.default)('combined', {
  stream: _fs2.default.createWriteStream(_path2.default.resolve(root, 'server.log'), {
    flags: 'a'
  })
}));else app.use((0, _koaMorgan2.default)('dev'));
app.use((0, _koaHelmet2.default)());
app.use((0, _koaEtag2.default)());
app.use((0, _koaCompress2.default)({
  threshold: 2048,
  flush: _zlib2.default.Z_SYNC_FLUSH
}));
app.use(_router2.default.middleware());
app.use((0, _koaMount2.default)('/graphql', (0, _koaConvert2.default)((0, _koaGraphql2.default)({
  schema: _schema2.default,
  graphiql: !ENV,
  pretty: !ENV,
  formatError: function formatError(error) {
    if (!ENV) console.log(error);
  }
}))));

// setting
app.listen(ENV ? 80 : 8000, function () {
  console.log('server start');
});