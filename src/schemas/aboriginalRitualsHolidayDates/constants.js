'use restrict';

export const seqsList = [].constructor.apply({}, new Array(17))
    .reduce((result, data, index) => {
      result[`seq${index+1}`] = index+1;
      return result;
    }, {});

export const ethnicsList = {
  amis: '阿美族',
  atayal: '泰雅族',
  paiwan: '排灣族',
  bunun: '布農族',
  puyuma: '卑南族',
  tsou: '鄒族',
  rukai: '魯凱族',
  saisiyat: '賽夏族',
  yami: '雅美族',
  thao: '邵族',
  kebaran: '噶瑪蘭族',
  truku: '太魯閣族',
  sakizaya: '撒奇萊雅族',
  seediq: '賽德克族'
};
