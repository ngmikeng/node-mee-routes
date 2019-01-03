const httpStatus = require('http-status');
const APIError = require('../helpers/errorHandlers/APIError');
// const Driver = require('../models/driver.model');
const db = require('../../models/index');
const Driver = db.Driver;
const responseHandler = require('../helpers/responseHandler/index');
const socketHandler = require('../helpers/socketHandler/index');

module.exports = {
  getList: getList,
  createOne: createOne,
  getById: getById,
  deleteById: deleteById,
  updateLocation: updateLocation
};

function getList(req, res, next) {
  Driver.findAll()
    .then(result => res.json(responseHandler.responseSuccess(result)))
    .catch(err => next(err));
}

function getById(req, res, next) {
  const driverId = req.params.driverId;

  Driver.findById(driverId)
    .then(result => res.json(responseHandler.responseSuccess(result)))
    .catch(err => next(err));
}

function createOne(req, res, next) {
  const data = req.body;

  Driver.create(data)
    .then(result => res.json(responseHandler.responseSuccess(result)))
    .catch(err => next(err));
}

function deleteById(req, res, next) {
  const driverId = req.params.driverId;

  Driver.findById(driverId).then(result => {
    if (result) {
      return result.destroy();
    } else {
      const err = new APIError(`Not found driver id ${driverId}`, httpStatus.NOT_FOUND, true);
      return Promise.reject(err);
    }
  })
  .then(result => res.json(responseHandler.responseSuccess(result)))
  .catch(err => next(err));
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
