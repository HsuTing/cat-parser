#!/usr/bin/env node
'use strict';

import path from 'path';
import fetch from 'node-fetch';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import chalk from 'chalk';

const store = memFs.create();
const fs = editor.create(store);
const root = path.resolve(__dirname, './../../constants');
const river = {};

const content = list => `
'use strict';

export default{
${
  Object.keys(list)
    .map(key => `  ${key}: "${list[key]}"`)
    .join(',\n')
}
};
`;

export default link => fetch(link)
  .then(res => res.json())
  .then(body => new Promise((resolve,reject) => {
    
    const river_data = body.RiverCode_OPENDATA;

    river_data.forEach(data => {
      const chiName = data.BasinName.replace(/ /g, '');
      const engName = data.EnglishBasinName.replace(/ /g, '');
      river[engName] = chiName;
    });
    console.log(root);
    fs.write(
      path.resolve(root, 'rivers.js'),
      content(river)
    );
    fs.commit(() => {
      resolve(chalk.cyan('Get data.'));
    });
  }
  ));
