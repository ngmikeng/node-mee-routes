const Sequelize = require('sequelize');
const mysqlConfig = require('../../config/databases/mysql');
const sequelize = mysqlConfig.getInstance();

const ClientRequest = sequelize.define('client_request', {
  name: {
    type: Sequelize.STRING
  },
  pickupAddress: {
    type: Sequelize.STRING
  },
  destAddress: {
    type: Sequelize.STRING
  },
  pickupLat: {
    type: Sequelize.STRING
  },
  pickupLong: {
    type: Sequelize.STRING
  },
  destLat: {
    type: Sequelize.STRING
  },
  destLong: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  note: {
    type: Sequelize.TEXT
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
    pickupAddress: '255 nvc q5',
    status: 'non-identified'
  });
});

module.exports = ClientRequest;
