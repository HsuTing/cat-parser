'use strict';

import Router from 'koa-better-router';

const router = Router().loadMethods();

router.get('/', ctx => {
  ctx.body = 'Hello World';
});

export default router;
