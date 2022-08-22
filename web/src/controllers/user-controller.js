const BaseController = require('./base-controller');
const { UserModel } = require('../models');

class UserController extends BaseController {
  constructor(props) {
    super(props);
  }
  async register() {
    const { email, firstName, lastName, fullName, customerId } = this.req.body;
    return await UserModel.create({ email, firstName, lastName, fullName, customerId });
  }
}

module.exports = UserController;
