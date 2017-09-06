'use strict';

/*export default word => {
  word = word.replace('台', '臺');
  return word.replace('阿里山', '阿里山鄉')
};*/

export default word => (
  word.replace('台', '臺')
    .replace('阿里山', '阿里山鄉')
);
