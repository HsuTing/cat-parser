'use strict';

const path = require('path');
const getbabelRelayPlugin =  require('babel-relay-plugin');

const schema = require(path.resolve(__dirname, './data/schema/open-data.json'));

module.exports = getbabelRelayPlugin(schema.data);
