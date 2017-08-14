'use strict';

import {
  GraphQLEnumType,
  GraphQLList,
  GraphQLString
} from 'graphql';
import chalk from 'chalk';

import synonym from 'utils/synonym';
import parseObjEnumType from 'utils/parse-obj-enumType';
import townshipsList from 'constants/townships';

export default key => ({
  township: {
    type: GraphQLString,
    description: '鄉鎮',
    resolve: data => {
      const township = synonym(data[key]);

      if((township).includes(Object.values(townshipsList)))
        console.log(chalk.red(`[graphql] "${township}" is not in townships list.`));

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
  getData = () => {},
  key = 'township'
) => async (data, {townships}, ctx) => {
  try {
    const {updateTime, data} = await getData(data, args, ctx);

    if(townships) {
      const townshipsChiName = townships.map(township => townshipsList[township]);

      return {
        updateTime,
        data: (data || []).filter(d => {
          return (synonym(d[key])).includes(townshipsChiName)
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
