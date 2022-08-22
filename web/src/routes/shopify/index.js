const { ShopifyController } = require('../../controllers');
const router = require('express').Router();

router.get('/shop', (req, res, next) => {
  const shopifyController = new ShopifyController(req);
  shopifyController
    .getShopConfig()
    .then((result) => res.send(result))
    .catch(next);
});

module.exports = router;
