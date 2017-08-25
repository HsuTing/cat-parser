#!/usr/bin/env node
'use strict';

import path from 'path';
import fetch from 'node-fetch';
import {parseString} from 'xml2js';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import chalk from 'chalk';

const store = memFs.create();
const fs = editor.create(store);
const root = path.resolve(__dirname, './../../constants');
const counties = {};
const townships = {
  ToufenTownship: '頭份鎮',
  TaoyuanDistrict: '桃園區'
};

const content = list => `
'use strict';

export default {
${
  Object.keys(list)
    .map(key => `  ${key}: "${list[key]}"`)
    .join(',\n')
}
};
`;

export default link => fetch(link)
  .then(res => res.text())
  .then(body => new Promise((resolve, reject) => parseString(
    body,
    (err, result) => {
      if(err)
        return reject(err);

      const {county_h_10508} = result.dataroot;

      county_h_10508.forEach(data => {
        const chi = data['欄位2'][0];
        const eng = data['欄位3'][0].split(', ');
        const countyChiName = chi.slice(0, 3);
        const townshipChiName = chi.slice(3);
        const countyEngName = eng[eng[1] ? 1: 0].replace(/ /g, '');
        const townshipEngName = eng[0].replace(/\.| |’/g, '');

        counties[countyEngName] = countyChiName;
        townships[townshipEngName] = townshipChiName;
      });

      fs.write(
        path.resolve(root, 'counties.js'),
        content(counties)
      );

      fs.write(
        path.resolve(root, 'townships.js'),
        content(townships)
      );

      fs.commit(() => {
        resolve(chalk.cyan('Get data.'));
      });
    }
  )));
