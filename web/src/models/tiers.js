const { Model } = require('sequelize');
const { tiersTypes } = require('./data-types');
const { withInit } = require('./utils');

class TiersModel extends Model {}

withInit(TiersModel, tiersTypes, 'Tiers');

module.exports = TiersModel;
