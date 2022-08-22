const { TireController } = require('../../controllers');
const { resProcess } = require('../../utils');
const { tireCreateValidation, tireUpdateValidation } = require('./schema-validator');
const router = require('express').Router();

router.get('/all', (req, res, next) => {
  const tireController = new TireController(req);
  tireController
    .getTires()
    .then((result) => res.send(result))
    .catch(next);
});

router.post('/create', tireCreateValidation, (req, res, next) => {
  console.log('creating tier');
  const tireController = new TireController(req);
  tireController
    .create()
    .then((result) => res.send(result))
    .catch(next);
});

router.put('/update/:id', tireUpdateValidation, (req, res, next) => {
  const tireController = new TireController(req);
  tireController
    .update()
    .then((result) => res.send(result))
    .catch(next);
});

router.delete('/delete/:id', tireUpdateValidation, (req, res, next) => {
  const tireController = new TireController(req);
  tireController
    .delete()
    .then((result) => res.send(result))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const tireController = new TireController(req);
  tireController
    .getTire()
    .then((result) => res.send(result))
    .catch(next);
});

module.exports = router;
