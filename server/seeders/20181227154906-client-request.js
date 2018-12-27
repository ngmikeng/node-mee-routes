'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ClientRequest', [
      {
        "name": "Hoang Thi T",
        "pickupAddress": "Truong tieu hoc Minh Dao.",
        "phone": "03212345678",
        "pickupLat": 10.754293383882437,
        "pickupLng": 106.66196057910656
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ClientRequest', null, {});
  }
};
