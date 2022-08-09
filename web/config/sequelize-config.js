const config = require('./index.js');

const dialectOptions = {
  bigNumberStrings: true,
};

if (config.dbConfig.uri) {
  dialectOptions.ssl = {
    require: true,
    rejectUnauthorized: false,
  };
}

module.exports = {
  development: {
    username: config.dbConfig.user,
    password: config.dbConfig.password,
    database: config.dbConfig.database,
    host: config.dbConfig.host,
    dialect: config.dbConfig.dialect,
    logging: false,
    pool: config.dbConfig.pool,
    dialectOptions,
  },
  production: {
    username: config.dbConfig.user,
    password: config.dbConfig.password,
    database: config.dbConfig.database,
    host: config.dbConfig.host,
    dialect: config.dbConfig.dialect,
    logging: false,
    pool: config.dbConfig.pool,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
