'use strict';

const getData = require('./../getDataFromWebsite');

getData(
  'taiwan/OIPList',
  '職業傷病防治中心名單',
  './public/taiwan/OIPList.json',
  'http://data.gov.tw/iisi/logaccess/77094?dataUrl=http://apiservice.mol.gov.tw/OdService/download/A17000000J-000003-gnl&ndctype=JSON&ndcnid=5957'
);
