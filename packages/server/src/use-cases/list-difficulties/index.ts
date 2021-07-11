import { ListDifficultiesController } from './list-difficulties.controller'
import { ListDifficultiesUseCase } from './list-difficulties.use-case'

const listDifficultiesUseCase = new ListDifficultiesUseCase()

const listDifficultiesController = new ListDifficultiesController(
  listDifficultiesUseCase
)

export { listDifficultiesController }
