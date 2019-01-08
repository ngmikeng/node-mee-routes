'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Employers', [
      {
        "name": "Employer 1",
        "status": "active",
        "type": "identifier"
      },
      {
        "name": "Employer 2",
        "status": "active",
        "type": "identifier"
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Employers', null, {});
  }
};
