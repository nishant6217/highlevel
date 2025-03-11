import "dotenv-safe/config";
import { SequelizeOptions } from "sequelize-typescript";

import { isProduction } from "../../../utils/commonHelpers";

// Need the following log for observability in Jenkins pipeline.
// eslint-disable-next-line
console.log(
  `\n\nDB name: ${process.env.DB_NAME}\nDB Host: ${process.env.DB_HOST}\n\n`
);

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    logging: (sql) => console.debug(sql),
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: +process.env.DB_MAX_CONNECTION || 5,
      min: +process.env.DB_MIN_CONNECTION || 0,
      acquire: process.env.DB_ACQUIRE!,
      idle: process.env.DB_IDLE!,
    },
  },
} satisfies Record<string, SequelizeOptions>;

export default config;

// CODE: this is added as sequelize migrations have problem with es6 import
// eslint-disable-next-line import/no-commonjs
module.exports = config;
