const winston = require("winston");

const loggerConfig = require("../config/logger");

/* The `loggerConfig` object is passed as a parameter to configure the logger with specific settings, 
such as log levels, transports, and formatting options. The resulting logger object can be used to 
log messages at different levels of severity. */
const logger = winston.createLogger(loggerConfig);

module.exports = logger;
