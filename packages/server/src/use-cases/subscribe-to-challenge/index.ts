import { SubscribeToChallengeController } from './subscribe-to-challenge.controller'
import { SubscribeToChallengeUseCase } from './subscribe-to-challenge.use-case'

const subscribeToChallengeUseCase = new SubscribeToChallengeUseCase()

const subscribeToChallengeController = new SubscribeToChallengeController(
  subscribeToChallengeUseCase
)

export { subscribeToChallengeController }
