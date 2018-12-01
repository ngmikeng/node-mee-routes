const ClientRequest = require('../models/client-request.model');
const responseHandler = require('../helpers/responseHandler/index');

module.exports = {
  getList: getList
};

function getList(req, res, next) {
  ClientRequest.findAll()
    .then(result => res.json(responseHandler.responseSuccess(result)));
}
