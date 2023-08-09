const logger = require("../utils/logger");

/* The errorHandler function handles errors by sending an appropriate status code and error message as
a JSON response, and logs the error. */
const errorHandler = (error, req, res, next) => {
  const errorStatus = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";

  res.status(errorStatus).json({
    message: errorMessage,
  });

  logger.error(errorStatus + ": " + errorMessage);
};

module.exports = errorHandler;
