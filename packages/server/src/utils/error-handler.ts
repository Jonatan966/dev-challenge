import { NextFunction, Request, Response } from 'express'

interface AppErrorConfig {
  statusCode: number
  message: string
}

export function errorHandler(
  error: AppError,
  request: Request,
  response: Response,
  next: NextFunction
): Response {
  return response.status(error.statusCode).json({
    statusCode: error.statusCode,
    status: 'error',
    message: error.message
  })
}

export class AppError extends Error {
  public statusCode: number

  constructor({ message, statusCode }: AppErrorConfig) {
    super(message)

    this.name = this.constructor.name
    this.message = message
    this.statusCode = statusCode

    Error.captureStackTrace(this, AppError)
  }
}
