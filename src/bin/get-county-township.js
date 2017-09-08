#!/usr/bin/env node
'use strict';

import coreGetCounty from './core/get-county-township';
import coreGetRiver from './core/get-river';

coreGetCounty('http://download.post.gov.tw/post/download/county_h_10603.xml')
  .then(result => console.log(result))
  .catch(err => console.log(err));

coreGetRiver('http://data.wra.gov.tw/Service/OpenData.aspx?format=json&id=336F84F7-7CFF-4084-9698-813DD1A916FE')
  .then(result => console.log(result))
  .catch(err => console.log(err));
