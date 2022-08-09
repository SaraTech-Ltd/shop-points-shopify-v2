const fs = require('fs');
const { Shopify, ApiVersion } = require('@shopify/shopify-api');

const DB_PATH = `${process.cwd()}/database.sqlite`;

const versionFilePath = '../version.txt';
let templateVersion = 'unknown';
if (fs.existsSync(versionFilePath)) {
  templateVersion = fs.readFileSync(versionFilePath, 'utf8').trim();
}

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY || '',
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET || '',
  SCOPES: process.env.SCOPES ? process.env.SCOPES.split(',') : [],
  HOST_NAME: process.env.HOST ? process.env.HOST.replace(/https?:\/\//, '') : '',
  HOST_SCHEME: process.env.HOST ? process.env.HOST.split('://')[0] : '',
  API_VERSION: ApiVersion.April22,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.SQLiteSessionStorage(DB_PATH),
  USER_AGENT_PREFIX: `Node App Template/${templateVersion}`,
});

module.exports = Shopify;
