const { body, check } = require("express-validator");
const validationCheck = require("../middleware/validation-check");

exports.signup = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  validationCheck,
];

exports.signin = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  validationCheck,
];
