import { Request, Response } from 'express'
import { User } from '@dev-challenge/entities'

import { AppController } from '../../contracts/app-controller'
import { AppUseCase } from '../../contracts/app-use-case'

export class ListUsersController extends AppController {
  constructor(private listUsersUseCase: AppUseCase<unknown, User[]>) {
    super()
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const users = await this.listUsersUseCase.execute()

    return response.json(users)
  }
}
