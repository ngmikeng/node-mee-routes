const Driver = require('../models/driver.model');
const responseHandler = require('../helpers/responseHandler/index');

module.exports = {
  getList: getList
};

function getList(req, res, next) {
  Driver.findAll()
    .then(result => res.json(responseHandler.responseSuccess(result)));
}
