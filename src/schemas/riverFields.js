'use strict';

import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLEnumType
} from 'graphql';

import parseObjEnumType from 'utils/parse-obj-enumType';
import notIncluded from 'utils/notIncluded';
import riversList from 'constants/rivers';

export default key => ({
  river: {
    type: new GraphQLNonNull(GraphQLString),
    description: '河川名稱',
    resolve: data => {
      const river = data[key];

      if(!Object.values(riversList).includes(river))
        notIncluded(`[graphql] "${river}" is not in rivers list. `);

      return river;
    }
  }
});

export const args = {
  rivers: {
    type: new GraphQLList(new GraphQLEnumType({
      name: 'RiverName',
      description: '河川名稱',
      values: parseObjEnumType(riversList)
    }))
  }
};

export const resolve = (
  {updateTime, data},
  key = 'river'
) => async (_data, {rivers} , ctx) => {
  try {
    if(rivers){
      const riversChiName = rivers.map(river => riversList[river]);

      return {
        updateTime,
        data: (data || /* istanbul ignore next */ []).filter(d => {
          return riversChiName.includes(d[key]);
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
