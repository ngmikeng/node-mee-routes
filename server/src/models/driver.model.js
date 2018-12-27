const Sequelize = require('sequelize');
const mysqlConfig = require('../../config/databases/mysql');
const sequelize = mysqlConfig.getInstance();
const simpleData = require('./simple-data/drivers.json');

const Driver = sequelize.define('driver', {
  name: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING,
    isIn: [['online', 'offline', 'busy']]
  },
  lat: {
    type: Sequelize.FLOAT
  },
  lng: {
    type: Sequelize.FLOAT
  },
  phone: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
Driver.sync({force: true}).then(() => {
  // Table created
  return Driver.bulkCreate(simpleData);
});

module.exports = Driver;
