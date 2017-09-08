'use strict';

import fetch from 'node-fetch';
import {parseString} from 'xml2js';

const counties = {};
const townships = {
  ToufenTownship: '頭份鎮',
  TaoyuanDistrict: '桃園區'
};

export default fetch('http://download.post.gov.tw/post/download/county_h_10603.xml')
  .then(res => res.text())
  .then(body => new Promise((resolve, reject) => parseString(
    body,
    (err, {dataroot}) => {
      /* istanbul ignore if */
      if(err)
        return reject(err);

      const {county_h_10508} = dataroot;

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

      resolve({
        counties,
        townships
      });
    }
  )));
