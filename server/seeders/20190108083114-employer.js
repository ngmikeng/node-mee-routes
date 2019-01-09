'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Employers', [
      {
        "name": "Employer 1",
        "status": "active",
        "type": "identifier",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Employer 2",
        "status": "active",
        "type": "identifier",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Employers', null, {});
  }
};
