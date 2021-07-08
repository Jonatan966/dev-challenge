import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { databaseClient } from '../../prisma/client'
import { AppError } from '../../utils/error-handler'
import { CreateUserDTO } from './create-user.dto'
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
        message: 'Já existe um usuário com este e-mail',
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

    return user
  }
}
