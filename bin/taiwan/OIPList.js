'use strict';

const shell = require('shelljs');

const message = require('./../message');

if(!shell.which('wget'))
  throw new Error('Sorry, this script requires wget');

message.success('taiwan/OIPList', '職業傷病防治中心名單');
shell.exec('wget -O ./public/taiwan/OIPList.json -q http://data.gov.tw/iisi/logaccess/77094?dataUrl=http://apiservice.mol.gov.tw/OdService/download/A17000000J-000003-gnl&ndctype=JSON&ndcnid=5957');
