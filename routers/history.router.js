const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const typeRole = require('../constants/typeRole');

const { getHisOfEx, deleteHis } = require('../controllers/history.controller');

router
  .route('/:id')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getHisOfEx))
  .delete(
    asyncMiddleware(authMiddleware), asyncMiddleware(deleteHis)
  )

module.exports = router;
