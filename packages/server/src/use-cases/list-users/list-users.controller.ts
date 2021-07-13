import { Request, Response } from 'express'

import { AppController } from '../../contracts/app-controller'
import { AppUseCase } from '../../contracts/app-use-case'
import { MappedUser } from './list-users.dto'

export class ListUsersController extends AppController {
  constructor(private listUsersUseCase: AppUseCase<unknown, MappedUser[]>) {
    super()
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const users = await this.listUsersUseCase.execute()

    return response.json(users)
  }
}
