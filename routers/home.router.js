const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const { renderHome } = require('../controllers/home.controller');

router
  .route('/')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(renderHome));

module.exports = router;
