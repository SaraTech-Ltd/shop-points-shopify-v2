const { UserController } = require('../../controllers');
const { resProcess } = require('../../utils');
const { userRegisterValidation } = require('./schema-validator');
const router = require('express').Router();

router.post('/register', userRegisterValidation, (req, res, next) => {
  const userController = new UserController(req);
  userController
    .register()
    .then((result) => res.send(result))
    .catch(next);
});

module.exports = router;
