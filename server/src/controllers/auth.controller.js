const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/errorHandlers/APIError');
const responseHandler = require('../helpers/responseHandler/index');
const config = require('../../config/config');
const db = require('../../models/index');
const Account = db.Account;

module.exports = {
  login: login
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  Account.findOne({
    where: {
      username: req.body.username,
      password: req.body.password,
    }
  })
  .then((user) => {
    if (user) {
      const token = jwt.sign({
        username: user.username
      }, config.jwtSecret, {expiresIn: '2h'});
      return res.json(responseHandler.responseSuccess({
        token,
        username: user.username
      }));
    } else {
      const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
      return next(err);
    }
  })
  .catch(e => next(e));
}
