import { NextFunction, Request, Response } from "express";

import { logger } from "../utils/loggers/logger";

// logger Middleware
export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logger = logger.child({
    path: req.originalUrl,
    method: req.method,
    query: req.query,
    params: req.params,
    traceId: req.traceId,
  });
  req.logger.debug("Request received");
  next();
};
