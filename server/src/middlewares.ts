import { ErrorRequestHandler } from 'express'
import { ErrorType, ConflictError, UnauthorizedError, NotFoundError } from './common/errors'

export const ErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof ConflictError) {
    res.status(ErrorType.CONFLICT)
    res.json(err)
    return
  }

  if (err instanceof UnauthorizedError) {
    res.status(ErrorType.UNAUTHORIZED)
    res.send(err)
    return
  }

  if (err instanceof NotFoundError) {
    res.status(ErrorType.NOT_FOUND)
    res.json(err)
    return
  }

  if ('code' in err) {
    res.status(err.code)
    res.json(err)
    return
  } else {
    res.status(ErrorType.SERVER_ERROR)
    res.json({ message: err.message })
    return
  }
}
