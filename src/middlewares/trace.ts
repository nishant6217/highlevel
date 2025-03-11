import { NextFunction, Request, Response } from "express";

import { uuidGenerator } from "../utils/uuidGenerator";

export const traceIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const traceId = req.get("traceId") || uuidGenerator();

  req.traceId = traceId;
  next();
};
