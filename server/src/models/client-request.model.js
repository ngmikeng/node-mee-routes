const Sequelize = require('sequelize');
const mysqlConfig = require('../../config/databases/mysql');
const sequelize = mysqlConfig.getInstance();

const ClientRequest = sequelize.define('client_request', {
  name: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.TEXT
  },
  note: {
    type: Sequelize.TEXT
  },
  lat: {
    type: Sequelize.FLOAT
  },
  long: {
    type: Sequelize.FLOAT
  },
  status: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
ClientRequest.sync({force: true}).then(() => {
  // Table created
  return ClientRequest.create({
    name: 'Tran Thi B',
    phone: '0123456789',
    address: '255 nvc',
    status: 'non-identified'
  });
});

module.exports = ClientRequest;
