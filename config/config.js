require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8080,
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || "*",
  NODE_ENV: process.env.NODE_ENV || "Development",
  SECRET: process.env.SECRET,
  DB: process.env.DB,
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  HOST: process.env.DB_HOST || "localhost",
  DIALECT: process.env.DB_DIALECT || "postgres",
};
