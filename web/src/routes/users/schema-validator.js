const Joi = require('joi');
const { validateRequest, validateParamsRequest } = require('../request-validator');

const userRegisterValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().max(125).optional(),
    lastName: Joi.string().max(125).optional(),
    fullName: Joi.string().max(250).optional(),
    customerId: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }),
  });
  validateRequest(req, next, schema);
};

module.exports = {
  userRegisterValidation,
};
