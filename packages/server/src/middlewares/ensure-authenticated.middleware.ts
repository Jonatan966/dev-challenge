import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { databaseClient } from '../prisma/client'
import { AppError } from '../utils/error-handler'

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
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
    const userTokenInfo = verify(token, process.env.TOKEN_GENERATOR_SECRET)
    const userTokenId = userTokenInfo.sub.toString()

    const userAlreadyExists = await databaseClient.user.findFirst({
      where: {
        id: userTokenId
      },
      select: {
        id: true
      }
    })

    if (!userAlreadyExists) {
      throw new Error('Token inválido')
    }

    request.userId = userAlreadyExists.id

    return next()
  } catch {
    throw new AppError({
      statusCode: 401,
      message: 'Token inválido'
    })
  }
}
