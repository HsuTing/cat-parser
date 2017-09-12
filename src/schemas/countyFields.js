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
import countiesList from 'constants/counties';

export default key => ({
  county: {
    type: new GraphQLNonNull(GraphQLString),
    description: '縣市',
    resolve: data => {
      const county = synonym(data[key]);

      if(!Object.values(countiesList).includes(county))
        notIncluded(`[graphql] "${county}" is not in counties list.`);

      return county;
    }
  }
});

export const args = {
  counties: {
    type: new GraphQLList(new GraphQLEnumType({
      name: 'CountiesInput',
      description: '縣市名稱',
      values: parseObjEnumType(countiesList)
    }))
  }
};

export const resolve = (
  {updateTime, data},
  key = 'county'
) => async (_data, {counties}, ctx) => {
  try {
    if(counties) {
      const countiesChiName = counties.map(county => countiesList[county]);

      return {
        updateTime,
        data: (data || /* istanbul ignore next */ []).filter(d => {
          return countiesChiName.includes(synonym(d[key]));
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
