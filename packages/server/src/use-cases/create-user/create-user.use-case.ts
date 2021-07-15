import { User } from '@dev-challenge/entities'
import { hash } from 'bcryptjs'
import { CreateUserDTO } from '@dev-challenge/dto'

import { databaseClient } from '../../prisma/client'
import { AppError } from '../../utils/error-handler'
import { AppUseCase } from '../../contracts/app-use-case'

export class CreateUserUseCase extends AppUseCase<CreateUserDTO, User> {
  async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    const userAlreadyExists = await databaseClient.user.findFirst({
      where: {
        email
      }
    })

    if (userAlreadyExists) {
      throw new AppError({
        errorType: 'input',
        fields: {
          email: 'Já existe um usuário com este e-mail'
        },
        statusCode: 400
      })
    }

    const passwordHash = await hash(password, 8)

    const user = await databaseClient.user.create({
      data: {
        name,
        email,
        password: passwordHash
      }
    })

    delete user.password

    const mappedUser: User = {
      id: user.id,
      avatarUrl: user.avatar_url,
      name: user.name,
      currentExperience: user.current_experience,
      currentLevel: user.current_level,
      experienceToNextLevel: 0
    }

    return mappedUser
  }
}
