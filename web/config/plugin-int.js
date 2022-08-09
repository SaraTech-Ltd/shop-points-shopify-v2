const Config = require('./index.js');
const { createConnection, CONNECTION_KEY_OLTP_WRITER, CONNECTION_KEY_OLTP_READER } = require('./db.js');

module.exports = async ({ rdsProxy = false }) => {
  if (Config.dbInit) {
    const connectionConfig = Config.dbConfig;
    const writerStartConnectTime = Date.now();
    await createConnection(connectionConfig, CONNECTION_KEY_OLTP_WRITER).catch((err) => {
      console.log(`FAILED_TO_CONNECT_DB_WRITER!`, {
        err,
        config: { host: connectionConfig.host, poolSize: connectionConfig.poolSize },
      });
      throw err;
    });
    console.info(`DB_WRITE_INIT_TOTAL_TIME`, { millisecond: Date.now() - writerStartConnectTime });
    console.info(`Database Connected${connectionConfig.host === 'localhost' ? ' at localhost' : ''}!!!`);

    // const connectionReaderConfig = Config.dbConfig;
    // if (connectionReaderConfig) {
    //   const readerStartConnectTime = Date.now();
    //   await createConnection(connectionReaderConfig, CONNECTION_KEY_OLTP_READER).catch((err) => {
    //     console.info(`FAILED_TO_CONNECT_DB_READER!`, {
    //       err,
    //       config: { host: connectionReaderConfig.host, poolSize: connectionReaderConfig.poolSize },
    //     });
    //     throw err;
    //   });
    //   console.info(`DB_READ_INIT_TOTAL_TIME`, { millisecond: Date.now() - readerStartConnectTime });
    //   console.info(
    //     `Reader instance database connected${connectionReaderConfig.host === 'localhost' ? ' at localhost' : ''}!!!`,
    //   );
    // }
  }
};
