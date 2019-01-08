'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employer = sequelize.define('Employer', {
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Employer.associate = function(models) {
    // associations can be defined here
    Employer.belongsTo(models.User, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
  };
  return Employer;
};