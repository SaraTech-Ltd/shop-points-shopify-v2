const environment = require('./envs.js');

const env = (process.env.TARGET_ENV || process.env.NODE_ENV || '').toUpperCase();

process.env = { ...process.env, ...environment };

const config = {};

config.ENVIRONMENT = environment;
config.ENV = env;
config.PORT = process.env.BACKEND_PORT || process.env.PORT || 9000;

config.shopify = {
  API_KEY: environment.SHOPIFY_API_KEY,
  API_SECRET: environment.SHOPIFY_API_SECRET,
  HOST: environment.HOST,
  SCOPES: environment.SCOPES,
  SHOP: environment.SHOP,
};

config.dbInit = environment.DB === 'Y';

config.dbBaseConfig = {
  database: environment.DB_NAME || 'moltoapp_db',
  user: environment.DB_USER || 'moltoapp_master_user',
  password: environment.DB_PASSWORD || 'moltoapp_master',
  port: environment.DB_PORT || 5432,
  uri: environment.DB_URI || null,
  pool: {
    max: Number(environment.DB_POOL_SIZE) || 20,
    min: 0,
    idle: 10000,
  },
  dialect: environment.DB_DIALECT || 'postgres',
};

config.dbConfig = {
  host: environment.DB_HOST || 'localhost',
  ...config.dbBaseConfig,
};

config.isLocal = env === 'DEVELOPMENT';

module.exports = config;
