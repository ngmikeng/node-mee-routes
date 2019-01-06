const httpStatus = require('http-status');
const db = require('../../models/index');
const User = db.User;
const APIError = require('../helpers/errorHandlers/APIError');
const responseHandler = require('../helpers/responseHandler/index');

module.exports = {
  load, get, list, create
};

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.findById(id)
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
  User.findAll({ limit: limit, offset: skip })
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
  const data = req.body;

  User.create(data)
    .then(savedUser => res.json(responseHandler.responseSuccess(savedUser)))
    .catch(e => next(e));
}
