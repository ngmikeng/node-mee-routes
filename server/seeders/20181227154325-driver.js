'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Drivers', [
      {
        "name": "Nguyen Van A",
        "status": "online",
        "phone": "0123456789",
        "password": "123456",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Le Tran B",
        "status": "online",
        "phone": "0123456780",
        "password": "123456",
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Drivers', null, {});
  }
};
