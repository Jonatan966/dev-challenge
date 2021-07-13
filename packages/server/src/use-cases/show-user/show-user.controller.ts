import { User } from '@dev-challenge/entities'
import { Request, Response } from 'express'

import { AppController } from '../../contracts/app-controller'
import { AppUseCase } from '../../contracts/app-use-case'
import { ShowUserUseCaseDTO } from './show-user.dto'

export class ShowUserController extends AppController {
  constructor(private showUserUseCase: AppUseCase<ShowUserUseCaseDTO, User>) {
    super()
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.params

    const loggedUserId = request.userId

    const findedUser = await this.showUserUseCase.execute({
      userId: loggedUserId ?? userId,
      hasAuth: !!loggedUserId
    })

    return response.json(findedUser)
  }
}
