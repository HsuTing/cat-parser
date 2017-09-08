'use strict';

import query from './utils/query';

describe('<%= name.split('').map(letter => (/[A-Z]/g).test(letter) ? ` ${letter.toLowerCase()}` : letter).join('') %>', () => {
  query(
    '<%= name %>', [
<% fields.forEach((field, index) => { -%>
<% if(field === 'geo') { -%>
      'geo'<%= index !== fields.length - 1 ? ',' : '' %>
<% } else if(field === 'county') { -%>
      'counties'<%= index !== fields.length - 1 ? ',' : '' %>
<% } else if(field === 'township') { -%>
      'townships'<%= index !== fields.length - 1 ? ',' : '' %>
<% } else if(field === 'river') { -%>
      'rivers'<%= index !== fields.length - 1 ? ',' : '' %>
<% } -%>
<% }) -%>
    ]
  );
});
