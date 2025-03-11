import { Response } from "express";

import { HttpErrorStatus, HttpSuccessStatus } from "./constants";

export type TExpressError = {
  status: HttpErrorStatus;
  message: string;
  details?: string;
  icon?: string;
};

const logError = ({
  res,
  safeStack,
  errorObj,
}: {
  res: Response;
  safeStack: unknown;
  errorObj: TExpressError;
}) => {
  if (res?.req?.logger) {
    res.req.logger.error(`Error in api: ${JSON.stringify(errorObj)}`, {
      body: res.req.body,
      stack: safeStack,
    });

    return;
  }

  console.error({
    prefixMsg: `Error in api: ${res?.req?.originalUrl}`,
    error: errorObj,
    metadata: {
      path: res?.req?.originalUrl,
      requestBody: res?.req?.body ? JSON.stringify(res.req.body) : null,
      stack: safeStack,
    },
  });
};

export const errorResponse = (error: TExpressError | Error, res: Response) => {
  if (!res) {
    return;
  }

  const safeStack =
    error && typeof error === "object"
      ? JSON.stringify(error, Object.getOwnPropertyNames(error))
      : error;

  const errorObj = { ...error } as TExpressError;

  if (error instanceof Error) {
    errorObj.message = error.message;
    errorObj.status = HttpErrorStatus.InternalServerError;
  }

  // Log error
  logError({
    res,
    safeStack,
    errorObj,
  });

  if (errorObj.status === HttpErrorStatus.InternalServerError) {
    logError({
      res,
      safeStack,
      errorObj: {
        status: HttpErrorStatus.InternalServerError,
        message: "Internal Server Error",
        details: "Please contact the system administrator",
      },
    });
  }

  res.status(errorObj.status || HttpErrorStatus.InternalServerError).send({
    message: errorObj.message || "Something went wrong",
    icon: errorObj.icon,
    success: false,
    error: {
      code: errorObj.status || HttpErrorStatus.InternalServerError,
      timeStamp: new Date().toLocaleString(),
      path: res.req.originalUrl,
      detail: errorObj.details || "Please contact the system administrator",
    },
  });
};

export type TExpressSuccess = {
  status: HttpSuccessStatus;
  message: string;
};

type TPagination = {
  total: number;
  pageSize: number;
};

export type TResponseData<T> = {
  success: boolean;
  message?: string;
  data: T & {
    pagination?: TPagination;
  };
};

export const successResponse = <T>(
  successObj: TExpressSuccess,
  data: T,
  res: Response<TResponseData<T>>,
  paginationData?: TPagination
) => {
  const finalData: TResponseData<T>["data"] = paginationData
    ? { pagination: paginationData, ...data }
    : (data as TResponseData<T>["data"]);

  res.status(successObj.status || HttpSuccessStatus.Ok).send({
    success: true,
    message: successObj.message,
    data: finalData,
  });
};

export const SUCCESS = {
  updateSuccess: {
    status: HttpSuccessStatus.Ok,
    message: "Update success",
  },
  fetchSuccess: {
    status: HttpSuccessStatus.Ok,
    message: "Fetch success",
  },
} satisfies Record<string, TExpressSuccess>;
