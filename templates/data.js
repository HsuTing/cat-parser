'use strict';

export default {
<% Object.keys(data).forEach((key, index) => {-%>
  <%= key %>: '<%= data[key] %>'<%= index !== Object.keys(data).length - 1 ? ',' : '' %>
<% }) -%>
};
