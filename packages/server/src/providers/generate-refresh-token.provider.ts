import { RefreshToken } from '@prisma/client'
import dayjs from 'dayjs'

import { databaseClient } from '../prisma/client'

export class GenerateRefreshTokenProvider {
  async execute(userId: string): Promise<RefreshToken> {
    const refreshTokenAlreadyExists =
      await databaseClient.refreshToken.findFirst({
        where: {
          userId
        }
      })

    if (refreshTokenAlreadyExists) {
      if (!(refreshTokenAlreadyExists.expiresIn < dayjs().unix())) {
        return refreshTokenAlreadyExists
      }

      await databaseClient.refreshToken.delete({
        where: {
          id: refreshTokenAlreadyExists.id
        }
      })
    }

    const generatedRefreshToken = await databaseClient.refreshToken.create({
      data: {
        userId,
        expiresIn: dayjs().add(2, 'hours').unix()
      }
    })

    return generatedRefreshToken
  }
}
