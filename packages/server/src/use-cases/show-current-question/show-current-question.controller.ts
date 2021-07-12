import { Request, Response } from 'express'
import { AppController } from '../../contracts/app-controller'
import { AppUseCase } from '../../contracts/app-use-case'
import {
  MappedCurrentQuestion,
  ShowCurrentQuestionUseCaseDTO
} from './show-current-question.dto'

export class ShowCurrentQuestionController extends AppController {
  constructor(
    private showCurrentQuestionUseCase: AppUseCase<
      ShowCurrentQuestionUseCaseDTO,
      MappedCurrentQuestion
    >
  ) {
    super()
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: subscriptionId } = request.params

    const currentQuestion = await this.showCurrentQuestionUseCase.execute({
      subscriptionId,
      userId: request.userId
    })

    return response.json(currentQuestion)
  }
}
