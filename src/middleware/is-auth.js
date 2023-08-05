const jwt = require("jsonwebtoken");

const config = require("../config/config");

/* The code is exporting a middleware function that is used for 
authentication in a Node.js application. */
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(authHeader.split(" ")[1], config.SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  req.userID = decodedToken.userID;

  next();
};
