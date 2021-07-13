import { ShowUserController } from './show-user.controller'
import { ShowUserUseCase } from './show-user.use-case'

const showUserUseCase = new ShowUserUseCase()

const showUserController = new ShowUserController(showUserUseCase)

export { showUserController }
