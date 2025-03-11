import "dotenv-safe/config";

import Sequelize from "sequelize";
import { Sequelize as TsSequelize } from "sequelize-typescript";

import { logger } from "../../utils/loggers/logger";

import configPath from "./config/config";

const env = process.env.SERVER_TYPE || "development";

logger.info(`SERVER TYPE: ${env}`);

const config = configPath[env];

const sequelize = new TsSequelize(
  config.database!,
  config.username!,
  config.password,
  config
);

sequelize.addModels([__dirname + "/models"]);

sequelize
  .authenticate()
  .then(() => {
    logger.info(`DB Connection Success! ${config.database}`);
    console.debug(`DB Connection Success! ${config.database}`);
  })
  .catch((err) => {
    logger.error(`DB Connection Error! ${err}`);
  });

const db = {
  sequelize,
  Sequelize,
};

export default db;
