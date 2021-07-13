import { Request, Response } from 'express'
import { AnswerStatus } from '@dev-challenge/entities'

import { AppController } from '../../contracts/app-controller'
import { AppUseCase } from '../../contracts/app-use-case'
import { AnswerCurrentQuestionUseCaseDTO } from './answer-current-question.dto'

export class AnswerCurrentQuestionController extends AppController {
  constructor(
    private answerCurrentQuestionUseCase: AppUseCase<
      AnswerCurrentQuestionUseCaseDTO,
      AnswerStatus
    >
  ) {
    super()
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: subscriptionId } = request.params
    const { answerId } = request.body

    const answerResult = await this.answerCurrentQuestionUseCase.execute({
      subscriptionId,
      answerId,
      userId: request.userId
    })

    return response.json(answerResult)
  }
}
