const { Model } = require('sequelize');
const { settingsTypes } = require('./data-types');
const { withInit } = require('./utils');

class SettingsModel extends Model {}

withInit(SettingsModel, settingsTypes, 'Settings');

module.exports = SettingsModel;
