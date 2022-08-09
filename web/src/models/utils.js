const Config = require('../../config/index.js');
const db = require('../../config/db.js');

const withInit = (Model, dataType, tableName, options = {}) => {
  const sequelizeInstance = db.createConnection(Config.dbConfig, db.CONNECTION_KEY_OLTP_WRITER);
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
