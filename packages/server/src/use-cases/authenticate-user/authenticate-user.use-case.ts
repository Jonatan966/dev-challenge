import { compare } from 'bcryptjs'
import { AuthObject } from '@dev-challenge/entities'
import { AuthenticateUserDTO } from '@dev-challenge/dto'

import { AppUseCase } from '../../contracts/app-use-case'
import { databaseClient } from '../../prisma/client'
import { AppError } from '../../utils/error-handler'
import { GenerateTokenProvider } from '../../providers/generate-token.provider'
import { GenerateRefreshTokenProvider } from '../../providers/generate-refresh-token.provider'

export class AuthenticateUserUseCase extends AppUseCase<
  AuthenticateUserDTO,
  AuthObject
> {
  async execute({ email, password }: AuthenticateUserDTO): Promise<AuthObject> {
    const userAlreadyExists = await databaseClient.user.findFirst({
      where: {
        email
      }
    })

    if (!userAlreadyExists) {
      throw new AppError({
        errorType: 'input',
        fields: {
          email: 'Não existe um usuário com este e-mail'
        },
        statusCode: 400
      })
    }

    const passwordMatch = await compare(password, userAlreadyExists.password)

    if (!passwordMatch) {
      throw new AppError({
        errorType: 'input',
        fields: {
          password: 'Senha incorreta'
        },
        statusCode: 400
      })
    }

    const generateTokenProvider = new GenerateTokenProvider()
    const token = generateTokenProvider.execute(userAlreadyExists.id)

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()
    const refreshToken = await generateRefreshTokenProvider.execute(
      userAlreadyExists.id
    )

    return { token, refreshToken }
  }
}
