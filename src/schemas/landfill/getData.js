'use strict';

import fs from 'fs';
import path from 'path';
import {parse} from 'csv';
import urlencode from 'urlencode';

import getIndividualData from './getIndividualData';

export default choice => new Promise((resolve, reject) => {
  fs.readFile(path.resolve(__dirname, './../../../data/landfill.csv'), (readError, input) => {
    if(readError)
      return reject(readError);

    parse(input, {comment: '#'}, (parseError, output) => {
      if(parseError)
        return reject(parseError);

      let individualTask = false;
      const tasks = output.slice(1).map((item, index) => {
        const name = item[1];
        if(name === '')
          return;

        if(choice) {
          if(name === choice)
            individualTask = [getIndividualData(
              name,
              `http://erdb.epa.gov.tw/DataRepository/Facilities/LandFillDetail.aspx?FacilityName=${urlencode(name)}&topic1=${urlencode('地')}&topic2=${urlencode('設施')}&subject=${urlencode('廢棄物處理')}`
            )];

          return;
        }

        return getIndividualData(
          name,
          `http://erdb.epa.gov.tw/DataRepository/Facilities/LandFillDetail.aspx?FacilityName=${urlencode(name)}&topic1=${urlencode('地')}&topic2=${urlencode('設施')}&subject=${urlencode('廢棄物處理')}`
        );
      });

      resolve(individualTask || tasks.slice(1));
    });
  });
});
