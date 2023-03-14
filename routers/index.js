const errorHandle = require('../middlewares/error.handle');
const ErrorResponse = require('../helpers/ErrorResponse');
const accountRouter = require('./account.router');
const excavatorRouter = require('./excavator.router');
const hisRouter = require('./history.router');
const loginRouter = require('./login.router');
const homeRouter = require('./home.router');

module.exports = (app) => {
  app.use('/', loginRouter);
  app.use('/home', homeRouter);
  //api
  app.use('/api/accounts', accountRouter);
  app.use('/api/excavators', excavatorRouter);
  app.use('/api/histories', hisRouter);

  app.use('*', (req, res, next) => {
    throw new ErrorResponse(404, 'Page not found');
  });
  app.use(errorHandle);
};
