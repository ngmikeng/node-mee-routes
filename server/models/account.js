'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Account.associate = function(models) {
    // associations can be defined here
  };
  return Account;
};