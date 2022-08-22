const { RulesController } = require('../../controllers');
const { resProcess } = require('../../utils');
const { updateRulesValidation } = require('./schema-validator');
const router = require('express').Router();

router.get('/all', (req, res, next) => {
  const rulesController = new RulesController(req);
  rulesController
    .getRules()
    .then((result) => res.send(result))
    .catch(next);
});

router.post('/update', updateRulesValidation, (req, res, next) => {
  const rulesController = new RulesController(req);
  rulesController
    .update()
    .then((result) => res.send(result))
    .catch(next);
});

module.exports = router;
