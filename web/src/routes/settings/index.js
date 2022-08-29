const { SettingsController } = require('../../controllers');
const router = require('express').Router();

router.get('/all', (req, res, next) => {
  const constroller = new SettingsController(req);
  constroller
    .getAllSettings()
    .then((result) => res.send(result))
    .catch(next);
});

router.post('/update', (req, res, next) => {
  const settingsController = new SettingsController(req);
  settingsController
    .updateOrCreate()
    .then((result) => res.send(result))
    .catch(next);
});

module.exports = router;
