const { StatusCodes } = require('http-status-codes');
const _ = require('lodash');
const Utils = require('../utils');
const { getConnection, CONNECTION_KEY_OLTP_WRITER } = require('../../config/db');

class BaseController {
  constructor(req) {
    this.req = req || this.throwRequired('req');
    this.statusCode = StatusCodes;
    this.sequlizer = getConnection(CONNECTION_KEY_OLTP_WRITER);
  }

  cleanObject(obj) {
    return Utils.objClean(obj);
  }

  throwRequired(key) {
    throw Utils.createError(`${key} is required`, this.statusCode.BAD_REQUEST);
  }

  throwError(message, statusCode = this.statusCode.UNPROCESSABLE_ENTITY, details = []) {
    return Utils.createError(message, statusCode, details);
  }

  commonErrorRes(err, msg = null, statusCode = this.statusCode.BAD_REQUEST) {
    const resBody = {
      message: _.get(err, 'message', msg),
      success: false,
      code: statusCode,
    };
    // if (this.environment.ENVIRONMENT != 'prod') {
    // }
    resBody.error = err;
    return resBody;
  }

  commonSuccessRes({ data = [], message = null, code = this.statusCode.OK, extra = {} }) {
    const resBody = {
      success: true,
      data,
      code,
      ...extra,
    };
    if (message != null) {
      resBody.message = message;
    }
    return resBody;
  }
}

module.exports = BaseController;
