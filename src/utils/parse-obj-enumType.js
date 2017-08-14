'use strict';

export default (obj = {}) => {
  const values = {};
  Object.keys(obj).forEach(key => {
    values[key] = {
      value: key,
      description: obj[key]
    };
  });

  return values;
};
