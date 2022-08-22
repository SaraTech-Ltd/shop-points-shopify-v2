exports.createError = (message, statusCode = 422, details = []) => {
  const customError = new Error(`${message}`);
  customError.statusCode = statusCode;
  customError.details = details;
  return customError;
};

exports.objClean = (obj) => {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
};

exports.resProcess = (res, r) => {
  if (r == undefined) {
    res.status(500);
    return res.send({
      sucess: false,
      errorMessage: 'Internal error. Response not set',
    });
  }
  let code = 200;
  if (r.code != undefined) {
    code = r.code;
    delete r['code'];
  }
  res.status(code);
  res.send(r);
};

exports.errResProcess = (res, errorMessage, code = 400) => {
  res.status(code);
  res.send({
    sucess: false,
    asdf: false,
    errorMessage,
  });
};
