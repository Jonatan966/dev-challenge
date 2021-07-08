import { Router } from 'express'
import { createUserController } from './use-cases/create-user'

const routes = Router()

routes.post('/users', createUserController.handle)

export { routes }
