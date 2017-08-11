'use strict';

import fetch from 'utils/fetch';

import dataType from './dataType';

export default {
  description: `
  空氣品質監測站基本資料

  1.環保署設於全國空氣品質監測站之基本資料；包括測站名稱、測站類別、座標、地址等。

  2.測站位置圖層，以SHP圖層打包zip檔，包含DBF、SHP、SHX等地理圖資，供地理資訊系統套圖

  資料來源：http://data.gov.tw/node/6075
  `,
  type: dataType,
  resolve: async () => {
    try {
      return (await fetch(
        'AirQualityMonitoringStation',
        'http://opendata.epa.gov.tw/ws/Data/AQXSite/?$format=json'
      )).map(data => ({
        id: `AirQualityMonitoringStation-${data.SiteEngName}`,
        ...data
      }));
    } catch(e) {
      console.log(e);
      return [];
    }
  }
};
