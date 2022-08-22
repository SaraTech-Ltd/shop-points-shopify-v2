const router = require('express').Router();

router.get('/hello-world', (req, res, next) => {
  const response = {
    success: true,
  };
  next(response);
});

module.exports = router;
