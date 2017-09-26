'use strict';

import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray
} from 'graphql-relay';

import notIncluded from 'utils/notIncluded';
import fields, {updateTime} from 'schemas/fields';

import {ethnicsList} from './constants';

const {nodeInterface} = fields;

export const dataFields = {
  id: globalIdField(
    'AboriginalRitualsHolidayDates',
    ({Seq}) => `AboriginalRitualsHolidayDates-${Seq}`
  ),
  seq: {
    type: new GraphQLNonNull(GraphQLString),
    description: '序號',
    resolve: ({Seq}) => Seq
  },
  datelisted: {
    type: new GraphQLNonNull(GraphQLString),
    description: '資料日期',
    resolve: ({DateListed}) => DateListed
  },
  ethnic: {
    type: new GraphQLNonNull(GraphQLString),
    description: '民族',
    resolve: ({Ethnic}) => {
      if(!Object.values(ethnicsList).includes(Ethnic))
        notIncluded(`[graphql] "${Ethnic}" is not in ethnics list.`);

      return Ethnic;
    }
  },
  name: {
    type: new GraphQLNonNull(GraphQLString),
    description: '祭儀名稱',
    resolve: ({Name}) => Name
  },
  alsoknownas: {
    type: new GraphQLNonNull(GraphQLString),
    description: '別稱',
    resolve: ({AlsoKnownAs}) => AlsoKnownAs
  },
  nativename: {
    type: new GraphQLNonNull(GraphQLString),
    description: '族語名稱',
    resolve: ({NativeName}) => NativeName
  },
  year: {
    type: new GraphQLNonNull(GraphQLString),
    description: '公告年度',
    resolve: ({Year}) => Year
  },
  keyDay: {
    type: new GraphQLNonNull(GraphQLString),
    description: '放假日',
    resolve: ({KeyDay}) => KeyDay
  },
  when: {
    type: new GraphQLNonNull(GraphQLString),
    description: '舉辦週期',
    resolve: ({When}) => When
  },
  duration: {
    type: new GraphQLNonNull(GraphQLString),
    description: '舉辦期間',
    resolve: ({Duration}) => Duration
  }
};
export const dataType = new GraphQLObjectType({
  name: 'AboriginalRitualsHolidayDates',
  description: '102年度原住民族歲時祭儀放假日期',
  interfaces: [nodeInterface],
  fields: dataFields
});

const {connectionType: aboriginalRitualsHolidayDatesConnection} =
  connectionDefinitions({name: 'aboriginalRitualsHolidayDates', nodeType: dataType});

export default new GraphQLObjectType({
  name: 'AboriginalRitualsHolidayDatesGroup',
  description: '102年度原住民族歲時祭儀放假日期集合',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('AboriginalRitualsHolidayDatesGroup'),
    updateTime: updateTime('AboriginalRitualsHolidayDates'),
    aboriginalRitualsHolidayDatesGroup: {
      type: aboriginalRitualsHolidayDatesConnection,
      description: '102年度原住民族歲時祭儀放假日期集合(type)',
      args: connectionArgs,
      resolve: ({data}, args) => connectionFromArray(data || [], args)
    }
  }
});
