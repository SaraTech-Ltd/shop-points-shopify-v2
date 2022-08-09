const Sequelize = require('sequelize');

const CONNECTION_KEY_OLTP_WRITER = 'CONNECTION_KEY_OLTP_WRITER';
const CONNECTION_KEY_OLTP_READER = 'CONNECTION_KEY_OLTP_READER';
const CONNECTION_KEYS = [CONNECTION_KEY_OLTP_WRITER, CONNECTION_KEY_OLTP_READER];

const SequelizeInit = ({ database, user, password, host, pool, uri }) => {
  const dialectOptions = {};
  if (uri) {
    dialectOptions.ssl = {
      rejectUnauthorized: false,
    };
  }
  return new Sequelize(database, user, password, {
    host: host,
    dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    pool,
    dialectOptions,
  });
};

/**
 * @type DBConnections
 */
const connections = {};

async function checkConnection(connection) {
  try {
    await connection.authenticate();
    console.log('DB CONNECTION SUCCESS!');
  } catch (err) {
    console.log('DB CONNECTION FAILED!', err);
  }
}

async function createConnection(config, connectionKey) {
  if (!CONNECTION_KEYS.includes(connectionKey)) {
    throw new Error(`Unknown connection key: ${connectionKey}. Should be in ${CONNECTION_KEYS}`);
  }
  if (connections[connectionKey]) {
    checkConnection(connections[connectionKey]);
    return connections[connectionKey];
  }
  connections[connectionKey] = SequelizeInit(config);
  checkConnection(connections[connectionKey]);

  return connections[connectionKey];
}

module.exports = { createConnection, SequelizeInit, CONNECTION_KEY_OLTP_WRITER, CONNECTION_KEY_OLTP_READER };
