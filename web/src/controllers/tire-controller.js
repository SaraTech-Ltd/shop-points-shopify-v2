const BaseController = require('./base-controller');
const { TiersModel, CampaignModel } = require('../models');
const { STATUS } = require('../constants');
const { isEmpty } = require('lodash');

class TireController extends BaseController {
  constructor(props) {
    super(props);
  }

  async create() {
    const user = this.req.user;
    const { name, amount, point, campaignName, campaignPoint } = this.req.body;
    const tire = await TiersModel.create({
      userId: user.id,
      name: name,
      amount: amount,
      point,
      status: STATUS.ACTIVE,
    });

    if (!isEmpty(campaignPoint)) {
      // create campaign
      const campaign = await CampaignModel.create({
        userId: user.id,
        tireId: tire.id,
        name: campaignName || 'Default',
        point: campaignPoint,
        status: STATUS.ACTIVE,
      });
      tire.campaignPoint = campaignPoint;
      tire.campaignName = campaignName;
      tire.campaignId = campaign.id;
    }
    return { success: true, data: tire };
  }

  async getTire() {
    const { id } = this.req.params;
    const tire = await TiersModel.findOne({ where: { id } });
    const campaign = await CampaignModel.findOne({ where: { tireId: id } });
    tire.campaign = campaign;
    return tire;
  }

  async getTires() {
    const user = this.req.user;
    const tire = await TiersModel.findOne({ where: { userId: user.id, isDefault: true } });
    const tires = await TiersModel.findAll({ where: { userId: user.id, isDefault: false } });
    return { default: tire, tires };
  }

  async update() {
    const { name, amount, point, campaignPoint } = this.req.body;
    const { id } = this.req.params;
    const user = this.req.user;
    await TiersModel.update(
      { name, amount, point },
      {
        where: {
          id,
        },
      },
    );
    if (campaignPoint) {
      const campaign = await CampaignModel.findOne({ where: { tireId: id } });
      if (campaign) {
        await CampaignModel.update(
          { point: campaignPoint },
          {
            where: {
              tireId: id,
            },
          },
        );
      } else {
        await CampaignModel.create({
          userId: user.id,
          tireId: id,
          name: 'Default',
          point: campaignPoint,
          status: STATUS.ACTIVE,
        });
      }
    }
    return { success: true };
  }

  async delete() {
    const { id } = this.req.params;
    const tire = await TiersModel.findOne({ where: { id } });
    if (!tire) {
      throw new Error('Tire not found!');
    }
    await TiersModel.destroy({ where: { id } });
    return { success: true, message: 'Tire delete successfully!' };
  }
}
module.exports = TireController;
