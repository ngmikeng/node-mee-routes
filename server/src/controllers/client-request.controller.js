// const ClientRequest = require('../models/client-request.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/errorHandlers/APIError');
const db = require('../../models/index');
const ClientRequest = db.ClientRequest;
const responseHandler = require('../helpers/responseHandler/index');
const googleMaps = require('../helpers/googleMaps/index');

module.exports = {
  loadById: loadById,
  getList: getList,
  getOne: getOne,
  createOne: createOne,
  updateOne: updateOne,
  deleteById: deleteById,
  updatePickupLocation: updatePickupLocation,
  getDirection: getDirection
};

/**
 * Load client request data by id and append to req.
 * @param {*} req.params.requestId - Client Request's id from url param
 * @param {*} requestId - Client Request's id can get from req.params.requestId
 */
function loadById(req, res, next, requestId) {
  ClientRequest.findById(requestId)
    .then(result => {
      req.clientRequest = result;
      return next();
    })
    .catch(err => next(err));
}

function getList(req, res, next) {
  ClientRequest.findAll({ include: ['Driver'] })
    .then(result => res.json(responseHandler.responseSuccess(result)))
    .catch(err => next(err));
}

function getOne(req, res, next) {
  const requestId = req.params.requestId;

  ClientRequest.findById(requestId)
    .then(result => res.json(responseHandler.responseSuccess(result)))
    .catch(err => next(err));
}

function createOne(req, res, next) {
  const data = req.body;

  ClientRequest.create(data)
    .then(result => res.json(responseHandler.responseSuccess(result)))
    .catch(err => next(err));
}

function updateOne(req, res, next) {
  if (req.clientRequest) {
    const data = req.body;
    const dataModel = req.clientRequest;
    dataModel.update(data).then(result => {
      res.json(responseHandler.responseSuccess(result));
    })
    .catch(err => next(err));
  } else {
    const err = new APIError(`Not found req.clientRequest data`, httpStatus.NOT_FOUND, true);
    next(err);
  }
}

function deleteById(req, res, next) {
  const requestId = req.params.requestId;

  ClientRequest.findById(requestId).then(result => {
    if (result) {
      return result.destroy();
    } else {
      const err = new APIError(`Not found client request id ${requestId}`, httpStatus.NOT_FOUND, true);
      return Promise.reject(err);
    }
  })
  .then(result => res.json(responseHandler.responseSuccess(result)))
  .catch(err => next(err));
}

function updatePickupLocation(req, res, next) {
  const requestId = req.params.requestId;
  const data = req.body;

  ClientRequest.findById(requestId).then(clientRequest => {
    if (clientRequest) {
      return clientRequest.update({
        pickupLat: data.lat,
        pickupLng: data.lng
      });
    } else {
      const err = new APIError(`Not found client request id ${requestId}`, httpStatus.NOT_FOUND, true);
      return Promise.reject(err);
    }
  })
  .then(result => res.json(responseHandler.responseSuccess(result)))
  .catch(err => next(err));
}

function getDirection(req, res, next) {
  const origin = req.query.origin;
  const destination = req.query.destination;

  googleMaps.getDirections(origin, destination)
    .then(result => res.json(responseHandler.responseSuccess(result)))
    .catch(err => next(err));
}
