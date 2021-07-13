import { Request, Response } from 'express'
import { Challenge } from '@dev-challenge/entities'

import { AppController } from '../../contracts/app-controller'
import { AppUseCase } from '../../contracts/app-use-case'
import { ListChallengesUseCaseDTO } from './list-challenges.dto'

export class ListChallengesController extends AppController {
  constructor(
    private listChallengesUseCase: AppUseCase<
      ListChallengesUseCaseDTO,
      Challenge[]
    >
  ) {
    super()
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { difficulty } = request.query

    const challenges = await this.listChallengesUseCase.execute({
      userId: request.userId,
      difficultyId: difficulty as string
    })

    return response.json(challenges)
  }
}
