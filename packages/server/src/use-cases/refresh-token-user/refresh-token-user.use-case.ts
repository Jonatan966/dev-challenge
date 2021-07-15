import { AuthObject } from '@dev-challenge/entities'
import { RefreshTokenUserDTO } from '@dev-challenge/dto'

import { AppUseCase } from '../../contracts/app-use-case'
import { databaseClient } from '../../prisma/client'
import { GenerateRefreshTokenProvider } from '../../providers/generate-refresh-token.provider'
import { GenerateTokenProvider } from '../../providers/generate-token.provider'
import { AppError } from '../../utils/error-handler'

export class RefreshTokenUserUseCase extends AppUseCase {
  public async execute({
    refreshToken
  }: RefreshTokenUserDTO): Promise<AuthObject> {
    const findedRefreshToken = await databaseClient.refreshToken.findFirst({
      where: {
        id: refreshToken
      }
    })

    if (!findedRefreshToken) {
      throw new AppError({
        errorType: 'input',
        fields: {
          refreshToken: 'Refresh token inválido'
        },
        statusCode: 400
      })
    }

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()
    const newRefreshToken = await generateRefreshTokenProvider.execute(
      findedRefreshToken.userId
    )

    const generateTokenProvider = new GenerateTokenProvider()
    const token = generateTokenProvider.execute(findedRefreshToken.userId)

    return { token, refreshToken: newRefreshToken }
  }
}
