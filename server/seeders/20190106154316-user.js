'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        "email": "driver@nodemeeroutes.com",
        "username": "driver_1",
        "password": "123456",
        "type": "driver"
      },
      {
        "email": "identifier@nodemeeroutes.com",
        "username": "identifier_1",
        "password": "123456",
        "type": "identifier"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
