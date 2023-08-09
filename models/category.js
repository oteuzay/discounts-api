const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

/* This code is defining a Sequelize model for a "Category" table in a database. */
const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
