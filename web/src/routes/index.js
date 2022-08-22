const Middleware = require('../../middleware');
const router = require('express').Router();

router.use(require('./hello-world'));
router.use('/users', require('./users'));
router.use('/tier', require('./tires'));
router.use('/rules', require('./rules'));
router.use('/shopify', require('./shopify'));
router.use(Middleware.ResponseHandlerMiddleware);
module.exports = router;
