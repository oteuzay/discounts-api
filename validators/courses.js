const { body, check } = require("express-validator");

const validationCheck = require("../middleware/validation-check");

exports.getCourses = [
  check("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "Page must be a positive integer and greater than or equal to 1."
    ),
  validationCheck,
];

exports.getCourse = [
  check("id").isInt({ min: 1 }).withMessage("Course ID must be a ID."),
  validationCheck,
];

exports.createCourse = [
  body("link").isURL().withMessage("Please enter a valid URL."),
  body("tags").isArray().withMessage("Tags should be an array."),
  body("categoryID").notEmpty().withMessage("Category ID cannot be empty."),
];

exports.deleteCourse = [
  check("id").isInt({ min: 1 }).withMessage("Course ID must be a ID."),
  validationCheck,
];
