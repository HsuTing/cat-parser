'use strict';

import {
  GraphQLObjectType
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray
} from 'graphql-relay';

import fields, {updateTime} from 'schemas/fields';
<% fields.forEach((field, index) => { -%>
<% if(field === 'geo') { -%>
import geoFields from 'schemas/geoFields';
<% } else if(field === 'county') { -%>
import countyFields from 'schemas/countyFields';
<% } else if(field === 'township') { -%>
import townshipFields from 'schemas/townshipFields';
<% } else if(field === 'river') { -%>
import riverFields from 'schemas/riverFields';
<% } -%>
<% }) -%>

const {nodeInterface} = fields;

export const dataFields = {
  id: globalIdField(
    '<%= upperName %>',
    ({SiteEngName}) => `<%= upperName %>-${SiteEngName}`
  ),
<% fields.forEach((field, index) => { -%>
<% if(field === 'geo') { -%>
  ...geoFields({lonKey: '<%= lon %>', latKey: '<%= lat %>'})<%= index !== fields.length - 1 ? ',' : '' %>
<% } else if(field === 'county') { -%>
  ...countyFields('<%= county %>')<%= index !== fields.length - 1 ? ',' : '' %>
<% } else if(field === 'township') { -%>
  ...townshipFields('<%= township %>')<%= index !== fields.length - 1 ? ',' : '' %>
<% } else if(field === 'river') { -%>
  ...riverFields('<%= river %>')<%= index !== fields.length - 1 ? ',' : '' %>
<% } -%>
<% }) -%>
};
export const dataType = new GraphQLObjectType({
  name: '<%= upperName %>',
  description: '<%= chiName %>',
  interfaces: [nodeInterface],
  fields: dataFields
});

const {connectionType: <%= name %>Connection} =
  connectionDefinitions({name: '<%= name %>', nodeType: dataType});

export default new GraphQLObjectType({
  name: '<%= upperName %>Group',
  description: '<%= chiName %>集合',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('<%= upperName %>Group'),
    updateTime: updateTime('<%= upperName %>'),
    <%= name %>Group: {
      type: <%= name %>Connection,
      description: '<%= chiName %>集合(type)',
      args: connectionArgs,
      resolve: ({data}, args) => connectionFromArray(data || /* istanbul ignore next */ [], args)
    }
  }
});
