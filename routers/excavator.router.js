const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const typeRole = require('../constants/typeRole');

const {
  getAllExcavator,
  createExcavator,
  updateExcavator,
  deleteExcavator,
  findById,
  findByIdAccount,
} = require('../controllers/excavator.controller');

router
  .route('/')
  .get(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    asyncMiddleware(getAllExcavator),
  )
  .post(asyncMiddleware(authMiddleware), asyncMiddleware(createExcavator));

router
  .route('/:id')
  .patch(asyncMiddleware(authMiddleware), asyncMiddleware(updateExcavator))
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(findById))
  .delete(asyncMiddleware(authMiddleware), asyncMiddleware(deleteExcavator));

router
  .route('/account/:id_acc')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(findByIdAccount));

module.exports = router;
