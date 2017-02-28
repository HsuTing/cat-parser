#!/usr/bin/env node
'use strict';

const db = require('cat-utils/lib/sqlite').default;

const getData = require('./../lib/schemas/landfill/getData').default;

db.serialize(() => {
  // rewrite
  db.run(`CREATE TABLE landfill (
    name TEXT,
    id INT PRIMARY KEY,
    area INT,
    time TEXT
  )`, err => {
    getData('台北市山豬窟垃圾掩埋場').then(tasks => {
      Promise.all(tasks).then(data => {
        data.forEach(item => db.run(`INSERT INTO landfill (
          name,
          id,
          area,
          time
        ) VALUES (
          ${item['名稱']},
          ${item['管制編號']},
          ${item['興建面積(公頃)']},
          ${new Date()}
        )`, err => console.log(err)));
      });
    }).catch(err => console.log(err));
  });
});
