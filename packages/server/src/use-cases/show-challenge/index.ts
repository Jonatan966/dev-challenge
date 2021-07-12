import { ShowChallengeController } from './show-challenge.controller'
import { ShowChallengeUseCase } from './show-challenge.use-case'

const showChallengeUseCase = new ShowChallengeUseCase()

const showChallengeController = new ShowChallengeController(
  showChallengeUseCase
)

export { showChallengeController }
