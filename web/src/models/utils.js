const Config = require('../../config/index.js');
const { createConnection, CONNECTION_KEY_OLTP_WRITER } = require('../../config/db.js');

const withInit = async (Model, dataType, tableName, options = {}) => {
  const sequelizeInstance = await createConnection(Config.dbConfig, CONNECTION_KEY_OLTP_WRITER);
  Model.init(dataType, {
    sequelize: sequelizeInstance,
    modelName: tableName,
    underscored: true,
    ...options,
  });
  return Model;
};

module.exports = {
  withInit,
};
