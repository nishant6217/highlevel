import winston from 'winston';

export const logger = winston.createLogger({
  level: (process.env.LOG_LEVEL || 'info').toLowerCase(),
  format: winston.format.simple(),
  transports: [new winston.transports.Console({})],
});
