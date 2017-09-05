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
      
      let check = Object.values(townshipsList).map(town => {
        if(town.includes(township))
          return true;
        return false;
      });
      if(check.includes(true))
        return township;

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
  {updateTime, data},
  originData,
  key = 'township'
) => async (_data, {townships}, ctx) => {
  try {
    if(townships) {
      const townshipsChiName = townships.map(township => townshipsList[township]);

      return {
        updateTime,
        data: (data || /* istanbul ignore next */ []).filter(d => {
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
