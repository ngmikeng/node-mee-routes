const ClientRequest = require('../models/client-request.model');
const responseHandler = require('../helpers/responseHandler/index');

module.exports = {
  getList: getList,
  createOne: createOne
};

function getList(req, res, next) {
  ClientRequest.findAll()
    .then(result => res.json(responseHandler.responseSuccess(result)));
}

function createOne(req, res, next) {
  const data = req.body;

  ClientRequest.create(data)
    .then(result => res.json(responseHandler.responseSuccess(result)));
}
