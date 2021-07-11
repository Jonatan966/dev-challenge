import { Router } from 'express'

import { createUserController } from './use-cases/create-user'
import { authenticateUserController } from './use-cases/authenticate-user'
import { refreshTokenUserController } from './use-cases/refresh-token-user'
import { listDifficultiesController } from './use-cases/list-difficulties'
import { ensureAuthenticated } from './middlewares/ensure-authenticated.middleware'
import { listChallengesController } from './use-cases/list-challenges'

const routes = Router()

routes.post('/users', createUserController.handle)
routes.post('/login', authenticateUserController.handle)
routes.post('/refresh-token', refreshTokenUserController.handle)

routes.get('/difficulties', listDifficultiesController.handle)
routes.get('/challenges', ensureAuthenticated, listChallengesController.handle)

export { routes }
