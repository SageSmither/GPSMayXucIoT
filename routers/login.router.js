const express = require('express');
const router = express.Router();
const loginControler = require('../controllers/login.controller');

router.route('/').get(loginControler.sigin).post(loginControler.login);
router
  .route('/sigup')
  .get(loginControler.register)
  .post(loginControler.register);

module.exports = router;
