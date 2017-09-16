'use strict';

import fs from 'fs';
import path from 'path';
import process from 'process';
import download from 'download';

export default download(
  'http://data.wra.gov.tw/Service/OpenData.aspx?format=json&id=336F84F7-7CFF-4084-9698-813DD1A916FE',
  {encoding: 'utf-8'}
)
  .then(data => {
    fs.writeFileSync(path.resolve(process.cwd(), './data/download-river.json'), data);
    return require(path.resolve(process.cwd(), './data/download-river.json'));
  })
  .then(({RiverCode_OPENDATA}) => ({
    rivers: RiverCode_OPENDATA.reduce((result, {BasinName, EnglishBasinName}) => {
      result[EnglishBasinName.replace(/ /g, '')] = BasinName.replace(/ /g, '');

      return result;
    }, {})
  }));
