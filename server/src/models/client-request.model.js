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
    type: Sequelize.FLOAT
  },
  pickupLng: {
    type: Sequelize.FLOAT
  },
  destLat: {
    type: Sequelize.FLOAT
  },
  destLng: {
    type: Sequelize.FLOAT
  },
  phone: {
    type: Sequelize.STRING
  },
  note: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.STRING,
    isIn: [['geocoded', 'picked', 'moving', 'done']]
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
