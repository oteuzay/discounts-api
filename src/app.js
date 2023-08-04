const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const config = require("./config/config");

const errorHandler = require("./middleware/error-handler");

const coursesRoutes = require("./routes/courses");

const app = express();

/* The `cors()` function is a middleware function that enables Cross-Origin Resource Sharing
(CORS) for the Express application. CORS is a mechanism that allows resources (e.g., APIs) on a web
page to be requested from another domain outside the domain from which the resource originated. */
app.use(
  cors({
    origin: config.ALLOWED_ORIGIN,
  })
);

/* `helmet()` is a middleware function that adds various HTTP headers to enhance the security
of the application. It helps protect the application from common security vulnerabilities such as
cross-site scripting (XSS), clickjacking, and other attacks. */
app.use(helmet());

/* `express.json()` is a middleware function that parses incoming requests with JSON payloads. */
app.use(express.json());

/* The `compression()` middleware function is used to enable gzip compression for the
responses sent by the server. Gzip compression reduces the size of the response body, making it
faster to transfer over the network. This can significantly improve the performance of the
application by reducing the amount of data that needs to be transferred between the server and the
client. */
app.use(compression());

/* The line is setting up a route for serving the Swagger UI documentation. */
if (config.NODE_ENV === "Development") {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

/*
 * Routes
 */
app.use("/api/courses", coursesRoutes);

/* `errorHandler` is registering the `errorHandler` middleware function with the Express
application. */
app.use(errorHandler);

module.exports = app;
