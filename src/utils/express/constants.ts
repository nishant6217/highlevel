export enum HttpErrorStatus {
  BadRequest = 400,
  UnAuthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
  BadGateway = 502,
  NoContent = 204,
}

export enum HttpSuccessStatus {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
}
