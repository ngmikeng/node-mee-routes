'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Driver', [
      {
        "name": "Nguyen Van A",
        "status": "online",
        "phone": "0123456789",
        "password": "123456"
      },
      {
        "name": "Le Tran B",
        "status": "online",
        "phone": "0123456780",
        "password": "123456"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Driver', null, {});
  }
};
