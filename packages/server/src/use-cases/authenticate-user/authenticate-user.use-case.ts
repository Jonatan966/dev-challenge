import { compare } from 'bcryptjs'

import { AppUseCase } from '../../contracts/app-use-case'
import { AuthenticateUserDTO } from './authenticate-user.dto'
import { databaseClient } from '../../prisma/client'
import { AppError } from '../../utils/error-handler'
import { GenerateTokenProvider } from '../../providers/generate-token.provider'
import { GenerateRefreshTokenProvider } from '../../providers/generate-refresh-token.provider'
import { AuthObject } from '../../contracts/auth-object'

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
        message: 'Não existe um usuário com este e-mail',
        statusCode: 400
      })
    }

    const passwordMatch = await compare(password, userAlreadyExists.password)

    if (!passwordMatch) {
      throw new AppError({
        message: 'Senha incorreta',
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
