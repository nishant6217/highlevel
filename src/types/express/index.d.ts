import winston from 'winston';

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/consistent-type-definitions
    export interface Request {
      logger: winston.Logger;
      traceId: string;
    }
  }
}
