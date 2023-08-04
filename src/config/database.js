const { Sequelize } = require("sequelize");

const config = require("./config");

/* Creating a new instance of the Sequelize class and assigning it to the `sequelize` constant. */
const sequelize = new Sequelize(config.DB, {
  dialect: config.DIALECT,
  host: config.HOST,
  username: config.USERNAME,
  password: config.PASSWORD,
});

module.exports = sequelize;
