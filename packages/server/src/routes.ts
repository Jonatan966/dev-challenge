import { Router } from 'express'

import { createUserController } from './use-cases/create-user'
import { authenticateUserController } from './use-cases/authenticate-user'
import { refreshTokenUserController } from './use-cases/refresh-token-user'

const routes = Router()

routes.post('/users', createUserController.handle)
routes.post('/login', authenticateUserController.handle)
routes.post('/refresh-token', refreshTokenUserController.handle)

export { routes }
