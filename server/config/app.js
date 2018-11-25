const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const httpStatus = require('http-status');
const cors = require('cors');
const helmet = require('helmet');
const winstonLogger = require('./winston');
const config = require('./config');
const APIError = require('../src/helpers/errorHandlers/APIError');
const responseHandler = require('../src/helpers/responseHandler/index');
const routes = require('../src/routes/index.route');
const configMongo = require('./databases/mongodb');
const configMySQL = require('./databases/mysql');

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// handle mongo
if (config.isUseMongo) {
  configMongo.createConnection()
    .then(() => {
      winstonLogger.info('Created connection to mongodb successful');
    })
    .catch((err) => {
      winstonLogger.error('Can not connect to mongodb.', {
        error: err
      });
    });
}

if (config.isUseMySQL) {
  configMySQL.createInstance();
}

// config swagger api
require('./swagger')(app);

// mount all routes on /api path
app.use('/api/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json(responseHandler.responseError(err))
);

module.exports = app;
