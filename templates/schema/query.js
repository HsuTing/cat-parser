'use strict';

import fetch from 'utils/fetch';
<% fields.forEach((field, index) => { -%>
<% if(field === 'geo') { -%>
import {
  args as geoArgs,
  resolve as geoResolve
} from 'schemas/geoFields';
<% } else if(field === 'county') { -%>
import {
  args as countyArgs,
  resolve as countyResolve
} from 'schemas/countyFields';
<% } else if(field === 'township') { -%>
import {
  args as townshipArgs,
  resolve as townshipResolve
} from 'schemas/townshipFields';
<% } else if(field === 'river') { -%>
import {
  args as riverArgs,
  resolve as riverResolve
} from 'schemas/riverFields';
<% } -%>
<% }) -%>

import dataType from './dataType';

export default {
  description: `
  <%= chiName %>

  資料來源：<%= website %>
  `,
  type: dataType,
  args: {
<% fields.forEach((field, index) => { -%>
<% if(field === 'geo') { -%>
    ...geoArgs<%= index !== fields.length - 1 ? ',' : '' %>
<% } else if(field === 'county') { -%>
    ...countyArgs<%= index !== fields.length - 1 ? ',' : '' %>
<% } else if(field === 'township') { -%>
    ...townshipArgs<%= index !== fields.length - 1 ? ',' : '' %>
<% } else if(field === 'river') { -%>
    ...riverArgs<%= index !== fields.length - 1 ? ',' : '' %>
<% } -%>
<% }) -%>
  },
  resolve: async (_data, {...args}, ctx) => {
    let data = await fetch(
      '<%= upperName %>',
      '<%= link %>'
    );

<% fields.forEach((field, index) => { -%>
<% if(field === 'geo') { -%>
    data = await geoResolve(data, {
      latKey: '<%= lat %>',
      lonKey: '<%= lon %>'
    })(_data, args, ctx);
<% } else if(field === 'county') { -%>
    data = await countyResolve(data, '<%= county %>')(_data, args, ctx);
<% } else if(field === 'township') { -%>
    data = await townshipResolve(data, '<%= township %>')(_data, args, ctx);
<% } else if(field === 'river') { -%>
    data = await riverResolve(data, '<%= river %>')(_data, args, ctx);
<% } -%>
<% }) -%>

    return data;
  }
};
