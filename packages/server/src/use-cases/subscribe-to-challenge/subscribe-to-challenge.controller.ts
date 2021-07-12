import { Request, Response } from 'express'

import { AppController } from '../../contracts/app-controller'
import { AppUseCase } from '../../contracts/app-use-case'
import {
  MappedSubscription,
  SubscribeToChallengeUseCaseDTO
} from './subscribe-to-challenge.dto'

export class SubscribeToChallengeController extends AppController {
  constructor(
    private subscribeToChallengeUseCase: AppUseCase<
      SubscribeToChallengeUseCaseDTO,
      MappedSubscription
    >
  ) {
    super()
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: challengeId } = request.params

    const subscriptionResult = await this.subscribeToChallengeUseCase.execute({
      challengeId,
      userId: request.userId
    })

    return response.json(subscriptionResult)
  }
}
