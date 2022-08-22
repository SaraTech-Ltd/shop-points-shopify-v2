const Sequelize = require('sequelize');

const CONNECTION_KEY_OLTP_WRITER = 'CONNECTION_KEY_OLTP_WRITER';
const CONNECTION_KEY_OLTP_READER = 'CONNECTION_KEY_OLTP_READER';
const CONNECTION_KEYS = [CONNECTION_KEY_OLTP_WRITER, CONNECTION_KEY_OLTP_READER];

class NoConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

const SequelizeInit = ({ database, user, password, host, pool, uri }) => {
  const dialectOptions = {};
  if (uri) {
    dialectOptions.ssl = {
      rejectUnauthorized: false,
    };
  }
  return new Sequelize(database, user, password, {
    host: host,
    logging: false,
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
  console.log('DB CONNECTION SUCCESS!');
  return connections[connectionKey];
}

/**
 *
 * @param {string} connectionKey
 * @returns sequelize.Database
 */
function getConnection(connectionKey) {
  if (!connections[connectionKey]) {
    throw new NoConnectionError(`Connection does not exist for connection key ${connectionKey}`);
  }
  return connections[connectionKey];
}

function terminateConnection(connectionKey) {
  if (!connections[connectionKey]) {
    throw new NoConnectionError(`Connection does not exist for connection key ${connectionKey}`);
  }
  return connections[connectionKey].instance.$pool.end().then(() => {
    delete connections[connectionKey];
  });
}

module.exports = {
  createConnection,
  SequelizeInit,
  CONNECTION_KEY_OLTP_WRITER,
  CONNECTION_KEY_OLTP_READER,
  getConnection,
  terminateConnection,
};
