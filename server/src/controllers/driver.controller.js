const Driver = require('../models/driver.model');
const responseHandler = require('../helpers/responseHandler/index');

module.exports = {
  getList: getList,
  createOne: createOne
};

function getList(req, res, next) {
  Driver.findAll()
    .then(result => res.json(responseHandler.responseSuccess(result)));
}

function createOne(req, res, next) {
  const data = req.body;

  Driver.create(data)
    .then(result => res.json(responseHandler.responseSuccess(result)));
}
