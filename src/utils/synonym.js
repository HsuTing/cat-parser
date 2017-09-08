'use strict';

export default word => (
  word.replace(/台/g, '臺')
    .replace(/阿里山$/g, '阿里山鄉')
);
