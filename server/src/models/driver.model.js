const Sequelize = require('sequelize');
const mysqlConfig = require('../../config/databases/mysql');
const sequelize = mysqlConfig.getInstance();

const Driver = sequelize.define('driver', {
  name: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  },
  lat: {
    type: Sequelize.FLOAT
  },
  lng: {
    type: Sequelize.FLOAT
  },
});

// force: true will drop the table if it already exists
Driver.sync({force: true}).then(() => {
  // Table created
  return Driver.create({
    name: 'Nguyen Van A',
    status: 'free'
  });
});

module.exports = Driver;
