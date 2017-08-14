#!/usr/bin/env node
'use strict';

const path = require('path');
const fetch = require('node-fetch');
const {parseString} = require('xml2js');
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');
const chalk = require('chalk');

const store = memFs.create();
const fs = editor.create(store);
const root = path.resolve(__dirname, './../src/constants');
const counties = {};
const townships = {};

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

fetch('http://download.post.gov.tw/post/download/county_h_10603.xml')
  .then(res => res.text())
  .then(body => parseString(body, (err, result) => {
    if(err)
      return console.log(err);

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

    fs.commit((err) => {
      if(err)
        return console.log(err);

      console.log(chalk.cyan('Get data.'));
    });
  }));
