const { Shopify } = require('@shopify/shopify-api');
const _ = require('lodash');
const { SHOP_QUERY } = require('../graphql-query');
const { UserModel, RulesModel, TiersModel, CampaignModel } = require('../models');
const { RULES, STATUS } = require('../constants');

class AccountController {
  async createAccount(session) {
    try {
      let user = await UserModel.findOne({ where: { shop: session.shop } });
      if (!user) {
        const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);
        const {
          body: { data },
        } = await client.query({ data: SHOP_QUERY });
        const shop = _.get(data, 'shop', null);
        console.log('creating user: ', shop.email);
        if (shop) {
          user = await UserModel.create({
            shop: session.shop,
            email: shop.email,
            fullName: shop.name,
            shopId: shop.id,
          });
          console.log('user register success!', user.id);
          await this.UserSeeds(user);
        }
      } else {
        console.log(`Shop ${session.shop} registered`);
      }
      return user;
    } catch (err) {
      console.log('found guilty when create account: ', err);
    }
  }
  async UserSeeds(user) {
    await RulesModel.create({
      userId: user.id,
      redemptionAmount: RULES.REDEMPTION_AMOUNT,
      redemptionPoint: RULES.REDEMPTION_POINT,
      redemptionPoint: RULES.REDEMPTION_POINT,
      expireMonth: RULES.EXPIRE_MONTH,
      fulfillmentDelay: RULES.FULFILLMENT_DELAY,
    });

    const tire = await TiersModel.create({
      userId: user.id,
      name: 'Default',
      amount: 100,
      point: 1,
      isDefault: true,
      status: STATUS.ACTIVE,
    });

    await CampaignModel.create({
      userId: user.id,
      tireId: tire.id,
      name: 'Default',
      point: 0,
      status: STATUS.ACTIVE,
    });
  }
}

module.exports = AccountController;
