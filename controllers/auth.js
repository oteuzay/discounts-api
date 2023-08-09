const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const User = require("../models/user");

const config = require("../config/config");

/* The `signup` function is responsible for handling the signup functionality. */
exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (user) {
      const error = new Error("Email or username already exists.");
      error.statusCode = 422;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User successfully created.",
    });
  } catch (err) {
    next(err);
  }
};

/* The `exports.signin` function is responsible for handling the signin functionality. */
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      const error = new Error("Email not found.");
      error.statusCode = 404;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Email or password wrong.");
      error.statusCode = 401;
      throw error;
    }

    const token = jsonwebtoken.sign(
      {
        userID: user.id,
        email: user.email,
      },
      config.SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login is successful.",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token: token,
    });
  } catch (err) {
    next(err);
  }
};
