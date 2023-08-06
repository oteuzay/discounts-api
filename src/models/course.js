/* The `DataTypes` object is used to define the data types of the columns in the Sequelize model. */
const { DataTypes } = require("sequelize");

/* This object is likely an instance of Sequelize, which is an ORM
(Object-Relational Mapping) library for Node.js. It is used to establish a connection to the
database and perform various database operations using Sequelize's methods and features. */
const sequelize = require("../config/database");

/* This helper function is likely used to convert the date format of a `Course` instance in the
`toDetail` method. */
const convertDateFormat = require("../helper/convert-date-format");

/* These lines of code are importing the `User` and `Category` models from their respective files. The
models are likely defined in separate files and exported using `module.exports`. By importing these
models, the `Course` model can establish associations and relationships with the `User` and
`Category` models in Sequelize. */
const User = require("./user");
const Category = require("./category");

/* The code is defining a Sequelize model for the "Course" table in the database. */
const Course = sequelize.define("Course", {
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
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coupon_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: ["General"],
  },
});

/* Defining an association between the `Course` model and the `Category` model in Sequelize. */
Course.belongsTo(Category, { foreignKey: "categoryID" });

/* Defining an association between the `Category` model and the `Course` model in Sequelize. */
Category.hasMany(Course, { foreignKey: "categoryID" });

/* Defining an association between the `User` model and the `Course` model in Sequelize. */
User.hasMany(Course, { foreignKey: "userID" });

/* Defining an association between the `Course` model and the `User` model in Sequelize. */
Course.belongsTo(User, { foreignKey: "userID" });

/* It is used to convert a `Course` instance into a detailed object that contains all the
essential information about the course. */
Course.prototype.toDetail = async function () {
  const {
    id,
    title,
    description,
    image,
    price,
    url,
    coupon_code,
    language,
    tags,
    createdAt,
    categoryID,
  } = this.get();

  const category = await Category.findOne({ where: { id: categoryID } });

  return {
    id,
    title,
    description,
    image,
    price,
    language,
    url,
    coupon_code,
    category: category ? category.title : null,
    tags,
    createdAt: convertDateFormat(createdAt),
  };
};

/* It is used to convert a `Course` instance into a summary object that contains only the
essential information about the course. */
Course.prototype.toSummary = async function () {
  const { id, title, description, image, categoryID } = this.get();
  const category = await Category.findOne({ where: { id: categoryID } });

  return {
    id,
    title,
    description,
    image,
    category: category ? category.title : null,
  };
};

module.exports = Course;
