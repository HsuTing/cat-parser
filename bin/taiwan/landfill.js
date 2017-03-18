'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');
const jsdom = require('jsdom');
const urlencode = require('urlencode');
const moment = require('moment');
const parse = require('csv').parse;

const message = require('./../message');
const writeFile = require('./../writeFile');

const projectName = 'taiwan/landfill';

const getData = name => new Promise((resolve, reject) => {
  const url = `http://erdb.epa.gov.tw/DataRepository/Facilities/LandFillDetail.aspx?FacilityName=${urlencode(name)}&topic1=${urlencode('地')}&topic2=${urlencode('設施')}&subject=${urlencode('廢棄物處理')}`

  jsdom.env({
    url,
    done: (err, window) => {
      const output = {};

      if(err) {
        message.error(projectName, `can not get data from ${name}`);
        return resolve(output);
      }

      const all = window.document.getElementById('meta');
      if(!all) {
        message.error(projectName, `can not parse data from ${name}`);
        return resolve(output);
      }

      const trs = all.querySelectorAll('tr');

      Array.from(trs).forEach(tr => {
        const items = tr.querySelectorAll('td');

        if(items) {
          let key = '';
          Array.from(items).forEach(item => {
            if(!item.querySelector('div')) {
              if(item.querySelector('span'))
                output[key] = item.querySelector('span').innerHTML;
              else
                key = item.innerHTML;
            }
          });
        }
      });

      const data = {
        name,
        id: output['管制編號'] || '',
        area: output['興建面積(公頃)'] || '',
        operating_unit: output['操作單位'] || '',
        build_organ: output['興建主辦機關'] || '',
        start_date: output['開工日期'] || '',
        address: output['地址'] || '',
        end_date: output['完工日期'] || '',
        type: output['營運型態'] || '',
        supervise_organ: output['營運監督機構'] || '',
        government_processing_capacity: output['縣府提供年保證處理量(公噸/年)'] || '',
        company_processing_capacity: output['一般事業廢棄物廠商保證量(公噸/年)'] || '',
        design_processing_capacity: output['設計處理量(公噸/日)'] || '',
        environmental_assessment_date: output['環評審查公告日期'] || '',
        update_time: moment().format()
      };

      message.success(projectName, name);
      resolve(data);
    }
  });
});

const update = (name, value = {}) => new Promise((resolve, reject) => {
  const landfillUpdateTime = 24 * 60 * 60;
  const diff = (
    value.update_time ?
    moment().unix() - moment(value.update_time).unix() :
    landfillUpdateTime + 1
  );
  const needToUpdate = diff > landfillUpdateTime;

  if(needToUpdate)
    getData(name)
      .then(data => resolve(data))
      .catch(err => reject(err));
  else
    resolve(value || {});
});

(() => {
  fs.readFile(path.resolve(process.cwd(), `./data/${projectName}.csv`), (readError, input) => {
    fs.readFile(path.resolve(process.cwd(), `./public/${projectName}.json`), (getDataError, originData) => {
      if(readError)
        throw new Error(readError);

      parse(input, {comment: '#'}, (parseError, output) => {
        if(parseError)
          throw new Error(parseError);

        const data = originData ? JSON.parse(originData) : {};
        const tasks = output.slice(1)
          .map(item => update(item[1], data[item[1]]));

        Promise.all(tasks)
          .then(data => {
            const output = {};

            data.forEach(item => {
              output[item.name] = item;
            });
            writeFile('taiwan/landfill', output);
          })
          .catch(err => console.log(err));
      });
    });
  });
})();
