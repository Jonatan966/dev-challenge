import { ListUsersController } from './list-users.controller'
import { ListUsersUseCase } from './list-users.use-case'

const listUsersUseCase = new ListUsersUseCase()

const listUsersController = new ListUsersController(listUsersUseCase)

export { listUsersController }
