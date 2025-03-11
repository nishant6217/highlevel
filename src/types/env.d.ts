import { ServiceModes } from "./commonTypes";

export {};

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/naming-convention
    interface ProcessEnv {
      readonly LOG_LEVEL?: string;
      readonly SERVER_TYPE: string;
      readonly SERVICE_NAME: string;
      readonly SERVICE_MODE: ServiceModes;

      // Database config
      readonly DB_USER: string;
      readonly DB_PASS: string;
      readonly DB_NAME: string;
      readonly DB_HOST: string;

      readonly DB_MAX_CONNECTION: number | string;
      readonly DB_MIN_CONNECTION: number | string;

      readonly DB_IDLE?: number;
      readonly DB_EVICT?: string;
      readonly DB_ACQUIRE?: number;

      // Redis Config
      readonly REDIS_HOST: string;
      readonly REDIS_PORT: string;
      readonly REDIS_DATABASE: string;
    }
  }
}
