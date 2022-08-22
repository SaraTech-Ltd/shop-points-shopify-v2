const _ = require('lodash');

const sendResponse = (req, res, result) => {
  const responseObject = {
    status: 200,
    result: {
      statusCode: 200,
      data: result,
    },
  };
  res.status(responseObject.status);
  res.send(responseObject.result);
};

const sendError = (req, res, error) => {
  const result = error.getErrorObject
    ? error.getErrorObject()
    : {
        code: error.code || error.statusCode || 500,
      };

  let errorMessage = 'Ops! Something went wrong';
  let name = _.get(error, 'name');
  // Find sequelize error
  if (name === 'SequelizeUniqueConstraintError') {
    const validationError = _.get(error, 'errors')[0];
    if (_.has(validationError, 'message')) {
      errorMessage = _.get(validationError, 'message');
    }
  } else if (error.message) {
    errorMessage = error.message;
  }
  if (error.details) {
    result.details = error.details;
  }
  result.errorMessage = errorMessage;
  const responseObject = {
    status: error.statusCode || 500,
    result,
  };

  // if (responseObject.status >= 500) {
  //   console.error(error);
  // } else {
  //   console.warn(error);
  // }

  res.status(responseObject.status);
  res.send(responseObject.result);
};

module.exports = (err, req, res, next) => {
  if (err instanceof Error || err.message || err.code || err.statusCode) {
    sendError(req, res, err);
  } else {
    sendResponse(req, res, err);
  }
  next();
};
