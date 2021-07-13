import { Request, Response } from 'express'
import { User } from '@dev-challenge/entities'

import { AppController } from '../../contracts/app-controller'
import { CreateUserDTO } from './create-user.dto'
import { AppUseCase } from '../../contracts/app-use-case'

export class CreateUserController extends AppController<CreateUserDTO> {
  constructor(public createUserUseCase: AppUseCase<CreateUserDTO, User>) {
    super()
  }

  async handle(
    request: Request<unknown, unknown, CreateUserDTO>,
    response: Response
  ): Promise<Response> {
    const { email, name, password } = request.body

    const createdUser = await this.createUserUseCase.execute({
      email,
      name,
      password
    })

    return response.status(201).json(createdUser)
  }
}
