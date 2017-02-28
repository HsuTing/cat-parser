'use strict';

import jsdom from 'jsdom';

import {error, success} from 'utils/message';

export default (name, url) => new Promise(resolve => {
  jsdom.env({
    url,
    done: (err, window) => {
      const output = {};

      if(err) {
        error(`can not get data from ${name}`);
        return resolve(output);
      }

      const all = window.document.getElementById('meta');
      if(!all) {
        error(`can not parse data from ${name}`);
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

      success(name);
      resolve(output);
    }
  });
});
