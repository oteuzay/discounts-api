const { body, check } = require("express-validator");

const validationCheck = require("../middleware/validation-check");

/* The `createCategory` is an array of middleware functions that will be executed when the
`createCategory` route is called. */
exports.createCategory = [
  body("title")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Title must be at least 10 characters long.")
    .isString()
    .withMessage("Title must be a string."),
  validationCheck,
];

/* The `updateCategory` is an array of middleware functions that will be executed when the
`updateCategory` route is called. */
exports.updateCategory = [
  body("title")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Title must be at least 10 characters long.")
    .isString()
    .withMessage("Title must be a string."),
  check("id")
    .isInt({ min: 1 })
    .withMessage(
      "Category ID must be a positive integer and greater than or equal to 1."
    ),
  validationCheck,
];

/* The `deleteCategory` is an array of middleware functions that will be executed when the
`deleteCategory` route is called. */
exports.deleteCategory = [
  check("id")
    .isInt({ min: 1 })
    .withMessage(
      "Category ID must be a positive integer and greater than or equal to 1."
    ),
  validationCheck,
];
