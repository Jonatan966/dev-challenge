import { ListChallengesController } from './list-challenges.controller'
import { ListChallengesUseCase } from './list-challenges.use-case'

const listChallengesUseCase = new ListChallengesUseCase()

const listChallengesController = new ListChallengesController(
  listChallengesUseCase
)

export { listChallengesController }
