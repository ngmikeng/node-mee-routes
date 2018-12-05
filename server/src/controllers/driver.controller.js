const Driver = require('../models/driver.model');
const responseHandler = require('../helpers/responseHandler/index');

module.exports = {
  getList: getList,
  createOne: createOne,
  deleteById: deleteById
};

function getList(req, res, next) {
  Driver.findAll()
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
      return Promise.resolve({
        message: `Not found driver id ${driverId}`
      });
    }
  })
  .then(result => res.json(responseHandler.responseSuccess(result)))
  .catch(err => next(err));
}
