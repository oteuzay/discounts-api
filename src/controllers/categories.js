const User = require("../models/user");
const Course = require("../models/course");
const Category = require("../models/category");

/* The `getCategories` function is an asynchronous function that handles the logic for
retrieving all categories from the database. */
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();

    res.status(200).json({
      categories: categories,
    });
  } catch (err) {
    next(err);
  }
};

/* The `createCategory` function is an asynchronous function that handles the logic for
creating a new category in the database. */
exports.createCategory = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.userID } });

    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    if (user.role !== "Admin") {
      const error = new Error(
        "You do not have the required permission to access this resource."
      );
      error.statusCode = 403;
      throw error;
    }

    await Category.create({
      title: req.body.title,
    });

    res.status(201).json({
      message: "Category successfully created.",
    });
  } catch (err) {
    next(err);
  }
};

/* The `updateCategory` function is an asynchronous function that handles the logic for
updating a category in the database. */
exports.updateCategory = async (req, res, next) => {
  try {
    const categoryID = req.params.id;

    const user = await User.findOne({ where: { id: req.userID } });

    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    if (user.role !== "Admin") {
      const error = new Error(
        "You do not have the required permission to access this resource."
      );
      error.statusCode = 403;
      throw error;
    }

    const category = await Category.findOne({ where: { id: categoryID } });

    if (!category) {
      const error = new Error("Category not found.");
      error.statusCode = 404;
      throw error;
    }

    await Category.update(
      {
        title: req.body.title,
      },
      { where: { id: categoryID } }
    );

    res.status(200).json({
      message: "Category successfully updated.",
    });
  } catch (err) {
    next(err);
  }
};

/* The `deleteCategory` function is an asynchronous function that handles the logic for
deleting a category from the database. */
exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryID = req.params.id;

    const user = await User.findOne({ where: { id: req.userID } });

    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    if (user.role !== "Admin") {
      const error = new Error(
        "You do not have the required permission to access this resource."
      );
      error.statusCode = 403;
      throw error;
    }

    const category = await Category.findOne({ where: { id: categoryID } });

    if (!category) {
      const error = new Error("Category not found.");
      error.statusCode = 404;
      throw error;
    }

    const course = await Course.findAll({ where: { categoryID: categoryID } });

    if (course.length !== 0) {
      const error = new Error(
        "You cannot delete the category because it contains courses."
      );
      error.statusCode = 403;
      throw error;
    }

    await category.destroy();

    res.status(200).json({
      message: "Category successfully deleted.",
    });
  } catch (err) {
    next(err);
  }
};
