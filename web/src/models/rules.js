const { Model } = require('sequelize');
const { rulesTypes } = require('./data-types');
const { withInit } = require('./utils');

class RulesModel extends Model {}

withInit(RulesModel, rulesTypes, 'Rules');

module.exports = RulesModel;
