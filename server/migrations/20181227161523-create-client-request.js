'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ClientRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      driverId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Drivers',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ClientRequests');
  }
};
