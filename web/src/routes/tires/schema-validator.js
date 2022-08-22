const Joi = require('joi');
const { validateRequest, validateParamsRequest } = require('../request-validator');

const tireCreateValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(125).required(),
    amount: Joi.number().required(),
    point: Joi.number().required(),
    status: Joi.string().optional(),
    campaignName: Joi.string().max(125).optional(),
    campaignPoint: Joi.number().optional(),
  });
  validateRequest(req, next, schema);
};

const tireUpdateValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(125).optional(),
    amount: Joi.number().optional(),
    point: Joi.number().optional(),
    status: Joi.string().optional(),
    campaignPoint: Joi.number().optional(),
  });
  validateRequest(req, next, schema);
};

module.exports = {
  tireCreateValidation,
  tireUpdateValidation,
};
