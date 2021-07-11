import { Router } from 'express'

import { createUserController } from './use-cases/create-user'
import { authenticateUserController } from './use-cases/authenticate-user'
import { refreshTokenUserController } from './use-cases/refresh-token-user'
import { listDifficultiesController } from './use-cases/list-difficulties'

const routes = Router()

routes.post('/users', createUserController.handle)
routes.post('/login', authenticateUserController.handle)
routes.post('/refresh-token', refreshTokenUserController.handle)

routes.get('/difficulties', listDifficultiesController.handle)

export { routes }
