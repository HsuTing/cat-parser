'use strict';

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray
} from 'graphql-relay';

import notIncluded from 'utils/notIncluded';
import fields, {updateTime} from 'schemas/fields';

import {namesList, shopsList} from './constants';

const {nodeInterface} = fields;

export const dataFields = {
  id: globalIdField(
    'AboriginalTenCharacteristicsFoods',
    ({Seq}) => `AboriginalTenCharacteristicsFoods-${Seq}`
  ),
  seq: {
    type: new GraphQLNonNull(GraphQLString),
    description: '序號',
    resolve: ({Seq}) => Seq
  },
  name: {
    type: new GraphQLNonNull(GraphQLString),
    description: '美食名稱',
    resolve: ({name}) => {
      if(!Object.values(namesList).includes(name))
        notIncluded(`[graphql] "${name}" is not in names list.`);

      return name;
    }
  },
  alsoknownas: {
    type: new GraphQLNonNull(GraphQLString),
    description: '別稱',
    resolve: ({AlsoKnownAs}) => AlsoKnownAs
  },
  shop: {
    type: new GraphQLNonNull(GraphQLString),
    description: '店家',
    resolve: ({shop}) => {
      if(!Object.values(shopsList).includes(shop))
        notIncluded(`[graphql] "${shop}" is not in shops list.`);

      return shop;
    }
  },
  address: {
    type: new GraphQLNonNull(GraphQLString),
    description: '店家地址',
    resolve: ({address}) => address
  },
  telephone: {
    type: new GraphQLNonNull(GraphQLString),
    description: '店家電話',
    resolve: ({telephone}) => telephone
  },
  awards: {
    type: new GraphQLNonNull(GraphQLString),
    description: '得獎紀錄',
    resolve: ({awards}) => awards
  }
};
export const dataType = new GraphQLObjectType({
  name: 'AboriginalTenCharacteristicsFoods',
  description: '原住民十大特色美食',
  interfaces: [nodeInterface],
  fields: dataFields
});

const {connectionType: aboriginalTenCharacteristicsFoodsConnection} =
  connectionDefinitions({name: 'aboriginalTenCharacteristicsFoods', nodeType: dataType});

export default new GraphQLObjectType({
  name: 'AboriginalTenCharacteristicsFoodsGroup',
  description: '原住民十大特色美食集合',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('AboriginalTenCharacteristicsFoodsGroup'),
    updateTime: updateTime('AboriginalTenCharacteristicsFoods'),
    aboriginalTenCharacteristicsFoodsGroup: {
      type: aboriginalTenCharacteristicsFoodsConnection,
      description: '原住民十大特色美食集合(type)',
      args: connectionArgs,
      resolve: ({data}, args) => connectionFromArray(data || /* istanbul ignore next */ [], args)
    }
  }
});
