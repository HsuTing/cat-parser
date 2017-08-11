'use strict';

import dataType from './dataType';
import {args as getArgs} from './definitions';

export default {
  description: '與地理資訊相關資料集合',
  type: dataType,
  args: getArgs,
  resolve: (parent, args) => args
};
