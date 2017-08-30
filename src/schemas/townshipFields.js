'use strict';

import {
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLList,
  GraphQLString
} from 'graphql';

import synonym from 'utils/synonym';
import parseObjEnumType from 'utils/parse-obj-enumType';
import notIncluded from 'utils/notIncluded';
import townshipsList from 'constants/townships';

export default key => ({
  township: {
    type: new GraphQLNonNull(GraphQLString),
    description: '鄉鎮',
    resolve: data => {
      const township = synonym(data[key]);

      if(!Object.values(townshipsList).includes(township))
        notIncluded(`[graphql] "${township}" is not in townships list.`);

      return township;
    }
  }
});

export const args = {
  townships: {
    type: new GraphQLList(new GraphQLEnumType({
      name: 'TownshipsInput',
      description: '鄉鎮名稱',
      values: parseObjEnumType(townshipsList)
    }))
  }
};

export const resolve = (
  getData,
  key = 'township'
) => async (data, args, ctx) => {
  try {
    const {townships} = args;
    const {updateTime, data} = await getData(data, args, ctx);

    if(townships) {
      const townshipsChiName = townships.map(township => townshipsList[township]);

      return {
        updateTime,
        data: (data || []).filter(d => {
          return townshipsChiName.includes(synonym(d[key]))
        })
      };
    }

    return {
      updateTime,
      data
    };
  } catch(e) {
    console.log(e);
    return {};
  }
};
