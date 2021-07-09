import { AuthenticateUserUseCase } from './authenticate-user.use-case'
import { AuthenticateUserController } from './authenticate-user.controller'

const authenticateUserUseCase = new AuthenticateUserUseCase()

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
)

export { authenticateUserController }
