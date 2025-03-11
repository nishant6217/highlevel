import { Router } from "express";

import db from "../database/postgres";
import { redisClient } from "../database/redis";

const healthCheckRouter = Router();

const checkDependenciesHealth = async () => {
  const [sql, redis] = await Promise.all([
    db.sequelize
      .authenticate()
      .then(() => {
        return "OK";
      })
      .catch(() => {
        return "NOT OK";
      }),
    redisClient
      .get("health")
      .then(() => {
        return "OK";
      })
      .catch(() => {
        return "NOT OK";
      }),
  ]);

  return { sql, redis };
};

healthCheckRouter.get("/", async (req, res) => {
  const healthChecks = await checkDependenciesHealth();

  req.logger.info(`Server health status ${JSON.stringify(healthChecks)}`);
  res.status(200).json(healthChecks);
});

export default healthCheckRouter;
