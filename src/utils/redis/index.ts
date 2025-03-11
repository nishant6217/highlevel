import Redis, { RedisKey } from "ioredis";

import { parseOrReturnJson } from "../commonHelpers";

/**
 *
 * @returns RedisClient instance
 * @description creates a new redis connection
 */

const redisConnection = ({
  redisHost,
  redisPort,
  redisDB,
}: {
  redisHost: string;
  redisPort: number;
  redisDB: number;
}): Redis => {
  const client = new Redis({
    host: redisHost,
    port: redisPort,
    db: redisDB,
    tls: {},
  });

  client.on("connect", () => console.info(" Redis client connected with TLS"));

  client.on("error", async (error) => {
    console.error({ prefixMsg: " Something went wrong with Redis", error });
  });

  return client;
};

export default redisConnection;

/**
 * @returns Promise of array of keys
 * @description returns all keys matching the pattern
 * @example
 * const keys = await getKeysAsync({ client: redisClient, pattern: 'smapleKey*' });
 * console.log(keys);
 * // ['smapleKey:123', 'smapleKey:456']
 * @example
 * const keys = await getKeysAsync({ client: redisClient, pattern: 'smapleKey:123' });
 * console.log(keys);
 * // ['smapleKey:123']
 */
export const getKeysAsync = async ({
  client,
  pattern,
}: {
  client: Redis;
  pattern: string;
}): Promise<Array<string>> => {
  const keys = await client.keys(pattern);

  return keys;
};

export const setExAsync = <T = unknown>({
  client,
  key,
  seconds,
  value,
}: {
  client: Redis;
  key: RedisKey;
  seconds: number;
  value: T;
}) => client.setex(key, seconds, JSON.stringify(value));

export const setRData = async <T = unknown>({
  client,
  key,
  value,
}: {
  client: Redis;
  key: RedisKey;
  value: T;
}) => {
  const stringifiedValue = JSON.stringify(value);

  return client.set(key, stringifiedValue);
};

export const updateRExpiry = async ({
  client,
  key,
  seconds,
}: {
  client: Redis;
  key: RedisKey;
  seconds: number;
}) => client.expire(key, seconds);

export const getRData = async <T = unknown>({
  client,
  key,
}: {
  client: Redis;
  key: RedisKey;
}) => {
  const data = await client.get(key);

  return data === null ? null : parseOrReturnJson<T>(data);
};

export const getAsync = async <T = unknown>({
  client,
  key,
}: {
  client: Redis;
  key: RedisKey;
}) => {
  const res = await client.get(key);

  return res === null ? null : parseOrReturnJson<T>(res);
};

export const incrAsync = ({
  client,
  key,
}: {
  client: Redis;
  key: RedisKey;
}): Promise<number> => client.incr(key);

export const decrAsync = ({
  client,
  key,
}: {
  client: Redis;
  key: RedisKey;
}): Promise<number> => client.decr(key);

export const incrByAsync = ({
  client,
  key,
  count,
}: {
  client: Redis;
  key: RedisKey;
  count: number;
}): Promise<number> => client.incrby(key, count);

export const decrByAsync = ({
  client,
  key,
  count,
}: {
  client: Redis;
  key: RedisKey;
  count: number;
}): Promise<number> => client.decrby(key, count);

export const delAsync = ({
  client,
  key,
}: {
  client: Redis;
  key: RedisKey;
}): Promise<number> => client.del(key);
