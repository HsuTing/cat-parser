'use strict';

import 'babel-polyfill';
import fs from 'fs';
import process from 'process';
import path from 'path';
import zlib from 'zlib';
import Koa from 'koa';
import morgan from 'koa-morgan';
import helmet from 'koa-helmet';
import compress from 'koa-compress';
import etag from 'koa-etag';
import body from 'koa-body';
import graphql from 'koa-graphql';

import schema from 'schemas/schema';

const app = new Koa();
const root = path.resolve(__dirname, './../');
const ENV = process.env.NODE_ENV === 'production';

// middleware
/* istanbul ignore if */
if(ENV)
  app.use(morgan('combined', {
    stream: fs.createWriteStream(
      path.resolve(root, 'server.log'), {
        flags: 'a'
      }
    )
  }));
else
  app.use(morgan('dev'));
app.use(helmet());
app.use(etag());
app.use(body());
app.use(compress({
  threshold: 2048,
  flush: zlib.Z_SYNC_FLUSH
}));

app.use(graphql({
  schema,
  graphiql: true,
  pretty: true
}));

// setting
/* istanbul ignore next */
export default app.listen(ENV ? process.env.PORT : 8000);
