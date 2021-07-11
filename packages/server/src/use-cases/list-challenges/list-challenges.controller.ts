import { Request, Response } from 'express'

import { AppController } from '../../contracts/app-controller'
import { AppUseCase } from '../../contracts/app-use-case'
import { MappedChallenge } from '../../entities/mapped-challenge'
import { ListChallengesUseCaseDTO } from './list-challenges.dto'

export class ListChallengesController extends AppController {
  constructor(
    private listChallengesUseCase: AppUseCase<
      ListChallengesUseCaseDTO,
      MappedChallenge[]
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
