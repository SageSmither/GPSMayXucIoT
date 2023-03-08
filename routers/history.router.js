const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const typeRole = require('../constants/typeRole');

const { getHisOfEx } = require('../controllers/history.controller');

router
  .route('/:id_ex')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getHisOfEx));

module.exports = router;
