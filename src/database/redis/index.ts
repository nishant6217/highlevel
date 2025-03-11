import Redis from "ioredis";

import redisConnection from "../../utils/redis";

// import redisConnection from "../../utils/redis";

import configPath from "./config";

const { redisHost, redisPort, redisDatabase } = configPath;

let nullableRedisClient: Redis | null = null;

// Create a new redis connection
if (!nullableRedisClient) {
  nullableRedisClient = redisConnection({
    redisHost: redisHost!,
    redisPort: parseInt(redisPort!, 10),
    redisDB: parseInt(redisDatabase!, 10),
  });
}

export const redisClient = nullableRedisClient!;
