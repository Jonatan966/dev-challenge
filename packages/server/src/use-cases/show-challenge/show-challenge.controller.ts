import { Request, Response } from 'express'
import { Challenge } from '@dev-challenge/entities'

import { AppController } from '../../contracts/app-controller'
import { AppUseCase } from '../../contracts/app-use-case'
import { ShowChallengeUseCaseDTO } from './show-challenge.dto'

export class ShowChallengeController extends AppController {
  constructor(
    private showChallengeController: AppUseCase<
      ShowChallengeUseCaseDTO,
      Challenge
    >
  ) {
    super()
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const findedChallenge = await this.showChallengeController.execute({
      challengeId: id,
      userId: request.userId
    })

    return response.json(findedChallenge)
  }
}
