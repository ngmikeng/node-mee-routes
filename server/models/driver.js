'use strict';
module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    name: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      isIn: [['online', 'offline', 'busy']]
    },
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    phone: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Driver.associate = function(models) {
    // associations can be defined here
    Driver.hasMany(models.ClientRequest, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
  };
  return Driver;
};
