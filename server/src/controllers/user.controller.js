const httpStatus = require('http-status');
const User = require('../models/user.model.js');
const APIError = require('../helpers/errorHandlers/APIError');
const responseHandler = require('../helpers/responseHandler/index');
const mongoConfig = require('../../config/databases/mongodb');

module.exports = {
  load, get, list, create, createByDb
};

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.getById(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.getList({ limit, skip })
    .then(users => res.json(responseHandler.responseSuccess(users)))
    .catch(e => next(e));
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({
    username: req.body.username,
    fullName: req.body.fullName
  });

  user.save()
    .then(savedUser => {
      return res.json(responseHandler.responseSuccess(savedUser));
    })
    .catch(e => next(e));
}

function createByDb(req, res, next) {
  const dbName = req.query.db;
  if (!dbName) {
    const err = new APIError('Invalid query param: db.', httpStatus.BAD_REQUEST, true);
    return next(err);
  } else {
    const connection = mongoConfig.useDb(dbName);
    const UserByDb = connection.model('User', User.schema);
    const user = new UserByDb({
      username: req.body.username,
      fullName: req.body.fullName
    });

    user.save()
      .then(savedUser => res.json(responseHandler.responseSuccess(savedUser)))
      .catch(e => next(e));
  }
}
