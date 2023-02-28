const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const typeRole = require('../constants/typeRole');

const {
  getAllAccount,
  register,
  login,
} = require('../controllers/account.controller');

router
  .route('/')
  .get(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    asyncMiddleware(getAllAccount),
  )
  .post(asyncMiddleware(register));

router.route('/login').post(asyncMiddleware(login));

module.exports = router;
