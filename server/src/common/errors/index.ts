const CustomError = require('extensible-custom-error')

export const ErrorType = {
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  BAD_REQUEST: 400
}

export class NotFoundError extends CustomError {
  constructor(msg: string) {
    super(msg)
  }
}

export class ForbiddenError extends CustomError {
  constructor(msg: string) {
    super(msg)
  }
}

export class UnauthorizedError extends CustomError {
  constructor(msg: string) {
    super(msg)
  }
}

export class UnprocessableError extends CustomError {
  constructor(msg: string) {
    super(msg)
  }
}

export class ConflictError extends CustomError {
  constructor(msg: string) {
    super(msg)
  }
}

export class BadRequestError extends CustomError {
  constructor(msg: string) {
    super(msg)
  }
}
