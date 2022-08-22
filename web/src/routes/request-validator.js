// helper function
const validateRequest = (
  req,
  next,
  schema,
  options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  },
) => {
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    const error_ = new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
    error_.statusCode = 400;
    throw error_;
  } else {
    req.body = value;
    next();
  }
};

const validateQueryRequest = (
  req,
  next,
  schema,
  options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  },
) => {
  const { error, value } = schema.validate(req.query, options);
  if (error) {
    const error_ = new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
    error_.statusCode = 400;
    throw error_;
  } else {
    req.query = value;
    next();
  }
};

const validateParamsRequest = (
  req,
  next,
  schema,
  options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  },
) => {
  const { error, value } = schema.validate(req.params, options);
  if (error) {
    const error_ = new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
    error_.statusCode = 400;
    throw error_;
  } else {
    req.params = { ...req.params, ...value };
    next();
  }
};
const validateParamsRequestAsync = async (
  req,
  next,
  schema,
  options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  },
) => {
  const { error, value } = await schema.validateAsync(req.params, options);
  if (error) {
    const error_ = new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
    error_.statusCode = 400;
    throw error_;
  } else {
    req.params = { ...req.params, ...value };
    next();
  }
};

const getValidationMiddleware = (schema, type = 'body') => {
  switch (type) {
    case 'query':
      return (req, _res, next) => validateQueryRequest(req, next, schema);
    default:
      return (req, _res, next) => validateRequest(req, next, schema);
  }
};

module.exports = {
  validateRequest,
  validateQueryRequest,
  validateParamsRequest,
  getValidationMiddleware,
  validateParamsRequestAsync,
};
