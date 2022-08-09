const { Model } = require('sequelize');
const { userTypes } = require('./data-types');
const { withInit } = require('./utils');

class UserModel extends Model {}

withInit(UserModel, userTypes, 'Users');

module.exports = UserModel;
