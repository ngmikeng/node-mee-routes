'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Accounts', [
      {
        "email": "driver@nodemeeroutes.com",
        "username": "driver_1",
        "password": "123456",
        "type": "driver",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "email": "identifier@nodemeeroutes.com",
        "username": "identifier_1",
        "password": "123456",
        "type": "identifier",
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Accounts', null, {});
  }
};
