'use strict';

export default word => {
  let temp = word.split(",");
  let deg = parseFloat(temp[0]);
  let min = parseFloat(temp[1]);
  let sec = parseFloat(temp[2]);

  return (deg + (min/60) + (sec/3600)).toFixed(6);
};
  
