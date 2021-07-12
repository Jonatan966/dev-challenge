import { ShowCurrentQuestionController } from './show-current-question.controller'
import { ShowCurrentQuestionUseCase } from './show-current-question.use-case'

const showCurrentQuestionUseCase = new ShowCurrentQuestionUseCase()

const showCurrentQuestionController = new ShowCurrentQuestionController(
  showCurrentQuestionUseCase
)

export { showCurrentQuestionController }
