import { NextFunction, Request, Response } from 'express'
import { AppErrorConfig } from '@dev-challenge/entities'

export function errorHandler(
  error: AppError,
  request: Request,
  response: Response,
  _next: NextFunction
): Response {
  return response.status(error.statusCode || 500).json({
    statusCode: error.statusCode || 500,
    errorType: error.errorType || 'internal',
    message: error.message,
    fields: error.fields
  })
}

export class AppError extends Error {
  public statusCode: number
  public errorType: string
  public fields: Record<string, string>

  constructor({ message, statusCode, errorType, fields }: AppErrorConfig) {
    super(message)

    this.name = this.constructor.name
    this.message = message
    this.errorType = errorType
    this.fields = fields
    this.statusCode = statusCode

    Error.captureStackTrace(this, AppError)
  }
}
