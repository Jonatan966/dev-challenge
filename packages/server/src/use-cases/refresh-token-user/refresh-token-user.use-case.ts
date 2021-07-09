import { AppUseCase } from '../../contracts/app-use-case'
import { AuthObject } from '../../contracts/auth-object'
import { databaseClient } from '../../prisma/client'
import { GenerateRefreshTokenProvider } from '../../providers/generate-refresh-token.provider'
import { GenerateTokenProvider } from '../../providers/generate-token.provider'
import { AppError } from '../../utils/error-handler'
import { RefreshTokenUserDTO } from './refresh-token-user.dto'

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
        message: 'Refresh token inválido',
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
