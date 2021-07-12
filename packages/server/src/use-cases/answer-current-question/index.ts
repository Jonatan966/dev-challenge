import { AnswerCurrentQuestionController } from './answer-current-question.controller'
import { AnswerCurrentQuestionUseCase } from './answer-current-question.use-case'

const answerCurrentQuestionUseCase = new AnswerCurrentQuestionUseCase()

const answerCurrentQuestionController = new AnswerCurrentQuestionController(
  answerCurrentQuestionUseCase
)

export { answerCurrentQuestionController }
