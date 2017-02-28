'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _koaBetterRouter = require('koa-better-router');

var _koaBetterRouter2 = _interopRequireDefault(_koaBetterRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _koaBetterRouter2.default)().loadMethods();

router.get('/', (0, _koaBody2.default)(), function (ctx) {
  ctx.body = 'Hello World';
});

exports.default = router;