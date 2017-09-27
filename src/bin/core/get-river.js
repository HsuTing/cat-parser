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
    rivers: RiverCode_OPENDATA.reduce((result, {BasinName, EnglishBasinName, SubsidiaryBasinName, EnglishSubsidiaryBasinName,
    SubSubsidiaryBasinName, EnglishSubSubsidiaryBasinName}) => {
      result[EnglishBasinName.replace(/ /g, '')] = BasinName.replace(/ |排水/g, '');

      if(EnglishSubsidiaryBasinName) {
        result[EnglishSubsidiaryBasinName.replace(/ |\.|\-|\'/g, '').replace(/ü/, 'u')] = // eslint-disable-line no-useless-escape
        SubsidiaryBasinName.replace(/ |排水/g, '');
      }

      if(EnglishSubSubsidiaryBasinName && !Object.values(result).includes(SubSubsidiaryBasinName.replace(/ |排水/g, '')))
        result[EnglishSubSubsidiaryBasinName.replace(/ |\./g, '')] = SubSubsidiaryBasinName.replace(/ |排水/g, '');

      return result;
    }, {})
  }));
