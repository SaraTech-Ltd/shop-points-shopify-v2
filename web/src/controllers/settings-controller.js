const BaseController = require('./base-controller');
const { RulesModel, SettingsModel } = require('../models');

class SettingsController extends BaseController {
  constructor(props) {
    super(props);
  }
  async updateOrCreate() {
    let { settings: data } = this.req.body;
    data = JSON.parse(data);
    const user = this.req.user;
    Object.keys(data).forEach(async (key) => {
      let settings = await SettingsModel.findOne({ where: { key, userId: user.id } });
      if (settings) {
        // update
        await SettingsModel.update({ value: data[key] }, { where: { id: settings.id } });
      } else {
        // create
        settings = await SettingsModel.create({ key, value: data[key], userId: user.id });
      }
    });

    return { success: true };
  }

  async getAllSettings() {
    const user = this.req.user;
    const settings = await SettingsModel.findAll({ where: { userId: user.id } });
    let result = {};
    if (settings.length) {
      settings.map((setting) => (result[setting.key] = setting.value));
    }
    return result;
  }
}

module.exports = SettingsController;
