import { Request, Response } from 'express'
import { AuthObject } from '@dev-challenge/entities'

import { AppController } from '../../contracts/app-controller'
import { AuthenticateUserDTO } from './authenticate-user.dto'
import { AppUseCase } from '../../contracts/app-use-case'

export class AuthenticateUserController extends AppController<AuthenticateUserDTO> {
  constructor(
    public authenticateUserUseCase: AppUseCase<AuthenticateUserDTO, AuthObject>
  ) {
    super()
  }

  async handle(
    request: Request<unknown, unknown, AuthenticateUserDTO>,
    response: Response
  ): Promise<Response> {
    const { email, password } = request.body

    const token = await this.authenticateUserUseCase.execute({
      email,
      password
    })

    return response.json(token)
  }
}
