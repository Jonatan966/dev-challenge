import { Request, Response } from 'express'

import { AppController } from '../../contracts/app-controller'
import { AppUseCase } from '../../contracts/app-use-case'
import { MappedChallenge } from '../../entities/mapped-challenge'
import { ShowChallengeUseCaseDTO } from './show-challenge.dto'

export class ShowChallengeController extends AppController {
  constructor(
    private showChallengeController: AppUseCase<
      ShowChallengeUseCaseDTO,
      MappedChallenge
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
