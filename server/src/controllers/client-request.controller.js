const ClientRequest = require('../models/client-request.model');
const responseHandler = require('../helpers/responseHandler/index');

module.exports = {
  getList: getList,
  createOne: createOne,
  deleteById: deleteById
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

function deleteById(req, res, next) {
  const requestId = req.params.requestId;

  ClientRequest.findById(requestId).then(result => {
    if (result) {
      return result.destroy();
    } else {
      return Promise.resolve({
        message: `Not found client request id ${requestId}`
      });
    }
  })
  .then(result => res.json(responseHandler.responseSuccess(result)))
  .catch(err => next(err));
}
