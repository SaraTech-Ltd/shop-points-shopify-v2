const BaseController = require('./base-controller');
const { RulesModel } = require('../models');

class RulesController extends BaseController {
  constructor(props) {
    super(props);
  }
  async getRules() {
    const user = this.req.user;
    const Rules = await RulesModel.findOne({ where: { userId: user.id } });
    return { success: true, rules: Rules };
  }

  async update() {
    const user = this.req.user;
    const { redemptionAmount, redemptionPoint, expireMonth, fulfillmentDelay } = this.req.body;
    const rules = await RulesModel.findOne({ where: { userId: user.id } });

    if (!rules) {
      throw new Error('Rules not found!');
    }

    await RulesModel.update(
      { redemptionAmount, redemptionPoint, expireMonth, fulfillmentDelay },
      { where: { userId: user.id } },
    );

    return {
      success: true,
    };
  }
}

module.exports = RulesController;
