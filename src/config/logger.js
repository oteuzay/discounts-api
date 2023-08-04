const winston = require("winston");

/* The `fileConfig` object is configuring the options for the file transport in the Winston logger. */
const fileConfig = {
  level: "error",
  filename: "./logs/errors.log",
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
};

/* The `consoleConfig` object is configuring the options for the console transport in the Winston logger. */
const consoleConfig = {
  level: "debug",
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      const ts = timestamp.slice(0, 19).replace("T", " ");
      return `${ts} [${level.toUpperCase()}]: ${message}`;
    })
  ),
};

/* The `loggerConfig` object is configuring the options for the Winston logger. */
const loggerConfig = {
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(fileConfig),
    new winston.transports.Console(consoleConfig),
  ],
  exitOnError: false,
};

module.exports = loggerConfig;
