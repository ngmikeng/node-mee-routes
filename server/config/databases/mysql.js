const Sequelize = require('sequelize');
const winstonLogger = require('../winston');
let sequelizeInstance = null;

module.exports = {
  createInstance: function () {
    sequelizeInstance = new Sequelize(
      process.env.MYSQL_DB,
      process.env.MYSQL_USER,
      process.env.MYSQL_PASS, {
        host: process.env.MYSQL_HOST,
        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        }
      });

    return sequelizeInstance;
  },
  getInstance: function () {
    return sequelizeInstance;
  },
  testConnection: function () {
    if (sequelizeInstance) {
      sequelizeInstance
        .authenticate()
        .then(() => {
          winstonLogger.info("MySQL DB connection has been established successfully.");
        })
        .catch(err => {
          winstonLogger.error("Unable to connect to the database:", {
            error: err
          });
        });
    } else {
      winstonLogger.error("Sequelize instance is null");
    }
  }
};
