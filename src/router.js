'use strict';

import body from 'koa-body';
import Router from 'koa-better-router';

const router = Router().loadMethods();

router.get('/', body(), ctx => {
  ctx.body = 'Hello World';
});

export default router;
