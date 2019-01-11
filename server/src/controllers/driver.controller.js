const httpStatus = require('http-status');
const APIError = require('../helpers/errorHandlers/APIError');
// const Driver = require('../models/driver.model');
const db = require('../../models/index');
const Driver = db.Driver;
const responseHandler = require('../helpers/responseHandler/index');
const socketHandler = require('../helpers/socketHandler/index');

module.exports = {
  loadById: loadById,
  getList: getList,
  getOne: getOne,
  createOne: createOne,
  updateOne: updateOne,
  deleteOne: deleteOne,
  updateLocation: updateLocation
};

/**
 * Load driver data by id and append to req.
 * @param {*} req.params.driverId - Driver's id from url param
 * @param {*} driverId - Driver's id can get from req.params.driverId
 */
function loadById(req, res, next, driverId) {
  Driver.findById(driverId)
    .then(result => {
      req.driver = result;
      return next();
    })
    .catch(err => next(err));
}

function getList(req, res, next) {
  Driver.findAll()
    .then(result => res.json(responseHandler.responseSuccess(result)))
    .catch(err => next(err));
}

function getOne(req, res, next) {
  if (req.driver) {
    return res.json(responseHandler.responseSuccess(req.driver));
  } else {
    const err = new APIError(`Not found req.driver data`, httpStatus.NOT_FOUND, true);
    next(err);
  }
}

function createOne(req, res, next) {
  const data = req.body;

  Driver.create(data)
    .then(result => res.json(responseHandler.responseSuccess(result)))
    .catch(err => next(err));
}

function updateOne(req, res, next) {
  if (req.driver) {
    const data = req.body;
    const dataModel = req.driver;
    dataModel.update(data).then(result => {
      const location = {
        lat: result.lat,
        lng: result.lng
      };
      socketHandler.emitDriverLocationChange(result.id, location);
  
      res.json(responseHandler.responseSuccess(result));
    })
    .catch(err => next(err));
  } else {
    const err = new APIError(`Not found req.driver data`, httpStatus.NOT_FOUND, true);
    next(err);
  }
}

function deleteOne(req, res, next) {
  if (req.driver) {
    const dataModel = req.driver;
    dataModel.destroy()
      .then(result => res.json(responseHandler.responseSuccess(result)))
      .catch(err => next(err));
  } else {
    const err = new APIError(`Not found req.driver data`, httpStatus.NOT_FOUND, true);
    next(err);
  }
}

function updateLocation(req, res, next) {
  const driverId = req.params.driverId;
  const data = req.body;

  Driver.findById(driverId).then(driver => {
    if (driver) {
      return driver.update({
        lat: data.lat,
        lng: data.lng
      });
    } else {
      const err = new APIError(`Not found driver id ${driverId}`, httpStatus.NOT_FOUND, true);
      return Promise.reject(err);
    }
  })
  .then(result => {
    const location = {
      lat: result.lat,
      lng: result.lng
    };
    socketHandler.emitDriverLocationChange(result.id, location);

    res.json(responseHandler.responseSuccess(result));
  })
  .catch(err => next(err));
}
