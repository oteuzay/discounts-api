const app = require("./src/app");

const config = require("./src/config/config");

const sequelize = require("./src/config/database");

const logger = require("./src/utils/logger");

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
