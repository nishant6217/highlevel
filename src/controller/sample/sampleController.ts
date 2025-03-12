import { NextFunction, Request, Response } from "express";
import { SUCCESS, successResponse } from "../../utils/express/helpers";

const sampleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return successResponse(SUCCESS.fetchSuccess, null, res);
  } catch (error) {
    next(error);
  }
};

export default {
  sampleController,
};
