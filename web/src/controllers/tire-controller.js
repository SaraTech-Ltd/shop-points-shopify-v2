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
    const { name, amount, point, campaignPoint } = this.req.body;
    const tire = await TiersModel.create({
      userId: user.id,
      name: name,
      amount: amount,
      point,
      campaignPoint,
      status: STATUS.ACTIVE,
    });

    return { success: true, data: tire };
  }

  async getTire() {
    const { id } = this.req.params;
    const tire = await TiersModel.findOne({ where: { id } });
    return tire;
  }

  async getTires() {
    const user = this.req.user;
    const tire = await TiersModel.findOne({ where: { userId: user.id, isDefault: true } });
    const tires = await TiersModel.findAll({
      where: { userId: user.id, isDefault: false },
      order: [['created_at', 'DESC']],
    });
    return { default: tire, tires };
  }

  async update() {
    const { name, amount, point, campaignPoint } = this.req.body;
    const { id } = this.req.params;
    await TiersModel.update(
      { name, amount, point, campaignPoint },
      {
        where: {
          id,
        },
      },
    );
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
