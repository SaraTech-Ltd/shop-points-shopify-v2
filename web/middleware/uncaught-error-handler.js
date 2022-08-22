module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode);
  } else {
    res.status(500);
  }

  const errObj = err.getErrorObject
    ? err.getErrorObject()
    : {
        code: err.code || err.statusCode,
        errorMessage: err.message || 'Ops! Something went wrong',
        eventId: res.sentry,
      };

  res.send(errObj);
  next();
};
