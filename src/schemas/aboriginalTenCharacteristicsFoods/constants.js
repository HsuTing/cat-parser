'use strict';

export const seqsList = [].constructor.apply({}, new Array(10))
  .reduce((result, data, index) => {
    result[`seq${index + 1}`] = index + 1;
    return result;
  }, {});

export const namesList = {
  one: '山玉芙蓉',
  two: '刺蔥涼拌山豬肉',
  three: '打那壽司',
  four: '雷貢糕',
  five: '山豬肉刺蔥刈包',
  six: '馬告燒鴨',
  seven: '火山慢慢爬',
  eight: '香蕉糕',
  nine: '甜蜜美人捲',
  ten: '野菜拼盤'
};

export const shopsList = {
  one: '紅磚美食坊',
  two: '山清休閒農園',
  three: '東眼山農場',
  four: '芭達桑原住民主題餐廳',
  five: '田媽媽泰雅風味館',
  six: '馬告風味餐坊',
  seven: '三番兩次原住民餐廳',
  eight: '達基力部落屋',
  nine: '響羅雷美食坊',
  ten: '紅瓦屋文化美食餐廳'
};
