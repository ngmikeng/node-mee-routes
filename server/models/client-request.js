'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClientRequest = sequelize.define('ClientRequest', {
    name: DataTypes.STRING,
    pickupAddress: DataTypes.STRING,
    destAddress: DataTypes.STRING,
    pickupLat: DataTypes.FLOAT,
    pickupLng: DataTypes.FLOAT,
    destLat: DataTypes.FLOAT,
    destLng: DataTypes.FLOAT,
    phone: DataTypes.STRING,
    note: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      isIn: [['geocoded', 'picked', 'moving', 'done']]
    }
  }, {});
  ClientRequest.associate = function(models) {
    // associations can be defined here
    ClientRequest.belongsTo(models.Driver, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
  };
  return ClientRequest;
};
