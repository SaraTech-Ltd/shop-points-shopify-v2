const dotenv = require('dotenv');

dotenv.config();

const createServer = require('./src/apps');

const pluginInt = require('./config/plugin-int.js');

const { setupGDPRWebHooks } = require('./gdpr.js');

const port = process.env.BACKEND_PORT || process.env.PORT;
const PORT = parseInt(port, 10);
const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;

// This sets up the mandatory GDPR webhooks. You’ll need to fill in the endpoint
// in the “GDPR mandatory webhooks” section in the “App setup” tab, and customize
// the code when you store customer data.
//
// More details can be found on shopify.dev:
// https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks
setupGDPRWebHooks('/api/webhooks');

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(PORT, async () => {
      await pluginInt({ rdsProxy: false });
      console.info(`Server started on port http://localhost:${PORT}`);
    }),
  );
}

module.exports = {
  createServer,
};
