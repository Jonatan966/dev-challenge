import { RefreshTokenUserController } from './refresh-token-user.controller'
import { RefreshTokenUserUseCase } from './refresh-token-user.use-case'

const refreshTokenUserUseCase = new RefreshTokenUserUseCase()

const refreshTokenUserController = new RefreshTokenUserController(
  refreshTokenUserUseCase
)

export { refreshTokenUserController }
