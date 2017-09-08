'use strict';

import fetch from 'node-fetch';

export default fetch('http://data.wra.gov.tw/Service/OpenData.aspx?format=json&id=336F84F7-7CFF-4084-9698-813DD1A916FE')
  .then(res => res.json())
  .then(({RiverCode_OPENDATA}) => ({
    rivers: RiverCode_OPENDATA.reduce((result, {BasinName, EnglishBasinName}) => {
      result[BasinName.replace(/ /g, '')] = EnglishBasinName.replace(/ /g, '');

      return result;
    }, {})
  }));
