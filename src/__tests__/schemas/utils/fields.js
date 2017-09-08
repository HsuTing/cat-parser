'use strict';

export const rivers = {
  args: `
    rivers: YanshuiRiver
  `,
  fields: `
    river
  `
};

export const geo = {
  args: `
    geo: {
      lat: 121,
      lon: 23.5,
      range: 1000
    }
  `,
  fields: `
    lat
    lon
  `
};

export const counties = {
  args: `
    counties: TaipeiCity
  `,
  fields: `
    county
  `
};

export const townships = {
  args: `
    townships: ToufenTownship
  `,
  fields: `
    township
  `
};
