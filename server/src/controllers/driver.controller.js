const Driver = require('../models/driver.model');

module.exports = {
  getList: getList
};

function getList() {
  return Driver.findAll();
}