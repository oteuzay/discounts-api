# Discounts API [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/oteuzay/discounts-api/blob/main/LICENSE)

Effortlessly and conveniently share the available discounts for various udemy courses using the functionality provided by this API.

## Stack

| Category            | Dependency                                                                                                                   |
|---------------------|------------------------------------------------------------------------------------------------------------------------------|
| Web Framework       | [Express Framework](https://expressjs.com/)                                                                                 |
| ORM & Database      | [Sequelize](https://sequelize.org/) - [Pg](https://www.npmjs.com/package/pg)                                                 |
| Validator           | [Express Validator](https://express-validator.github.io/docs)                                                               |
| Authentication      | [JWT](https://www.npmjs.com/package/jsonwebtoken)                                                                  |
| Logging             | [Winston](https://github.com/winstonjs/winston)                                                                             |
| Documentation       | [Swagger](https://swagger.io/)                                                                                             |
| Security            | [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - [Helmet](https://helmetjs.github.io/)                                |
| HTTP Client         | [Axios](https://axios-http.com/)                                                                                           |
| Others              | [Cors](https://www.npmjs.com/package/cors) - [Compression](https://www.npmjs.com/package/compression) - [Dotenv](https://github.com/motdotla/dotenv) - [Nodemon](https://github.com/remy/nodemon) |

## Installation

You can get the project up and running by following the steps below.

Make sure to fill in your actual configuration details in the .env file before running the application.

```sh
  git clone https://github.com/oteuzay/discounts-api.git
```

```sh
  cd discounts-api
```

```sh
  cp .env.example .env
```

```sh
  npm install
```

```sh
  npm run dev
```

## Documentation

When you set NODE_ENV to Development in your environment variables, you gain access to the Swagger documentation.

The Swagger documentation can be found at the following endpoint:

`/api-docs`

## Issues

Feel free to create an issue in our repository for any problems, questions, or feedback you have.

## Contributing

We welcome contributions, new features, improvements, and feedback.

Please fork the repository, make your changes, and submit a pull request for consideration.
