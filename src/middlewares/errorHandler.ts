import { NextFunction, Request, Response } from "express";

import { TExpressError, errorResponse } from "../utils/express/helpers";

export function errorHandler(
  error: TExpressError,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  // Let express handle the response if headers are already sent
  if (res.headersSent) {
    return next(error);
  }

  return errorResponse(error, res);
}
