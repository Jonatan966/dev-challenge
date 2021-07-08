import { CreateUserController } from './create-user.controller'
import { CreateUserUseCase } from './create-user.use-case'

const createUserUseCase = new CreateUserUseCase()

export const createUserController = new CreateUserController(createUserUseCase)
