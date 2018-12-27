'use strict';
module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    phone: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Driver.associate = function(models) {
    // associations can be defined here
    Driver.hasMany(models.ClientRequest, { onDelete: 'CASCADE' });
  };
  return Driver;
};
