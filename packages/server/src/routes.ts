import { Router } from 'express'

import { createUserController } from './use-cases/create-user'
import { authenticateUserController } from './use-cases/authenticate-user'
import { refreshTokenUserController } from './use-cases/refresh-token-user'
import { listDifficultiesController } from './use-cases/list-difficulties'
import { ensureAuthenticated } from './middlewares/ensure-authenticated.middleware'
import { listChallengesController } from './use-cases/list-challenges'
import { showChallengeController } from './use-cases/show-challenge'
import { subscribeToChallengeController } from './use-cases/subscribe-to-challenge'
import { showCurrentQuestionController } from './use-cases/show-current-question'

const routes = Router()

routes.post('/users', createUserController.handle)
routes.post('/login', authenticateUserController.handle)
routes.post('/refresh-token', refreshTokenUserController.handle)

routes.get('/difficulties', listDifficultiesController.handle)

routes.use(ensureAuthenticated)
routes.get('/challenges', listChallengesController.handle)
routes.get('/challenges/:id', showChallengeController.handle)
routes.get('/challenges/:id/subscribe', subscribeToChallengeController.handle)

routes.get(
  '/subscriptions/:id/current-question',
  showCurrentQuestionController.handle
)

export { routes }
