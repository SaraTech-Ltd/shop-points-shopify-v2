const { Shopify } = require('@shopify/shopify-api');
const BaseController = require('./base-controller');
const { UserModel } = require('../models');
const { SHOP_QUERY } = require('../graphql-query');

class ShopifyController extends BaseController {
  constructor(props) {
    super(props);
  }
  async getShopConfig() {
    const session = this.req.session;
    const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);
    const shopData = await client.query({ data: SHOP_QUERY });
    const user = await UserModel.findOne({ where: { shop: session.shop } });
    return this.commonSuccessRes({ data: { session, shopData } });
  }
}

module.exports = ShopifyController;
