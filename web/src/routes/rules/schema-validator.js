const Joi = require('joi');
const { validateRequest } = require('../request-validator');

const updateRulesValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(125).optional(),
    redemptionAmount: Joi.number().optional(),
    redemptionPoint: Joi.number().optional(),
    expireMonth: Joi.number().optional(),
    fulfillmentDelay: Joi.number().optional(),
  });
  validateRequest(req, next, schema);
};

module.exports = { updateRulesValidation };
