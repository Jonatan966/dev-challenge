import { SkipQuestionController } from './skip-question.controller'
import { SkipQuestionUseCase } from './skip-question.use-case'

const skipQuestionUseCase = new SkipQuestionUseCase()

const skipQuestionController = new SkipQuestionController(skipQuestionUseCase)

export { skipQuestionController }
