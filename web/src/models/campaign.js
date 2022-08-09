const { Model } = require('sequelize');
const { campaignsTypes } = require('./data-types');
const { withInit } = require('./utils');

class CampaignModel extends Model {}

withInit(CampaignModel, campaignsTypes, 'Campaigns');

module.exports = CampaignModel;
