'use strict';

import jsdom from 'jsdom';
import urlencode from 'urlencode';
import moment from 'moment';

import {error, success} from 'utils/message';
import firebase, {auth} from 'cat-utils/lib/firebaseInit';

auth();

export default name => new Promise((resolve, reject) => {
  const url = `http://erdb.epa.gov.tw/DataRepository/Facilities/LandFillDetail.aspx?FacilityName=${urlencode(name)}&topic1=${urlencode('地')}&topic2=${urlencode('設施')}&subject=${urlencode('廢棄物處理')}`

  jsdom.env({
    url,
    done: (err, window) => {
      const output = {};

      if(err) {
        error(`can not get data from ${name}`);
        return reject(output);
      }

      const all = window.document.getElementById('meta');
      if(!all) {
        error(`can not parse data from ${name}`);
        return reject(output);
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

      success(name);
      firebase.database().ref(`taiwan/landfill/${name}`).set(data);
      resolve(data);
    }
  });
});
