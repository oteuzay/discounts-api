const app = require("./app");

const config = require("./config/config");

const sequelize = require("./config/database");

const logger = require("./utils/logger");

/* Synchronizing the Sequelize models with the database and starting the server. */
sequelize
  .sync()
  .then(() => {
    app.listen(config.PORT, () => {
      logger.info(`Server is running on port ${config.PORT}.`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });
