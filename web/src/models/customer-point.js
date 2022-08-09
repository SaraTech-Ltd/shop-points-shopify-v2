const { Model } = require('sequelize');
const { customerPointsTypes } = require('./data-types');
const { withInit } = require('./utils');

class CustomerPointModel extends Model {}

withInit(CustomerPointModel, customerPointsTypes, 'CustomerPoints');

module.exports = CustomerPointModel;
