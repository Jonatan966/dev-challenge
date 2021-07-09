import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../utils/error-handler'

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authToken = request.headers.authorization

  if (!authToken) {
    throw new AppError({
      statusCode: 401,
      message: 'Token não informado'
    })
  }

  if (!authToken.match(/Bearer [^\s]/)) {
    throw new AppError({
      statusCode: 401,
      message: 'Token inválido'
    })
  }

  const [, token] = authToken.split(' ')

  try {
    verify(token, process.env.TOKEN_GENERATOR_SECRET)

    return next()
  } catch {
    throw new AppError({
      statusCode: 401,
      message: 'Token inválido'
    })
  }
}
