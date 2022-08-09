let ENV = {};

const Path = require('path');
const dotenv = require('dotenv');

const rootPath = Path.join(process.cwd(), '.');

let mainEnv = dotenv.config({
  path: Path.resolve(rootPath, `.db-config`),
});

if (mainEnv.error) console.error(mainEnv.error);

mainEnv = mainEnv.error ? {} : mainEnv.parsed;

ENV = { ...mainEnv };

module.exports = ENV;
