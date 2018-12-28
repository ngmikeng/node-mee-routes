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
    status: DataTypes.STRING,
    driverId: {
      type: DataTypes.INTEGER
    }
  }, {});
  ClientRequest.associate = function(models) {
    // associations can be defined here
    ClientRequest.belongsTo(models.Driver, { onDelete: 'CASCADE' });
  };
  return ClientRequest;
};
