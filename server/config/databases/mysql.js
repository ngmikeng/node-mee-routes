const Sequelize = require('sequelize');
const sequelizeInstance = new Sequelize(
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

module.exports = {
  createInstance: function() {
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
  getInstance: function() {
    return sequelizeInstance;
  },
  testConnection: function() {
    sequelizeInstance
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch(err => {
        console.error("Unable to connect to the database:", err);
      });
  }
};
