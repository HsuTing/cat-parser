#!/usr/bin/env node
'use strict';

import core from './core/get-county-township';

core('http://download.post.gov.tw/post/download/county_h_10603.xml')
  .then(result => console.log(result))
  .catch(err => console.log(err));
