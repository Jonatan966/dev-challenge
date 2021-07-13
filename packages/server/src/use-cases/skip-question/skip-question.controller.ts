import { Request, Response } from 'express'
import { AppController } from '../../contracts/app-controller'
import { AppUseCase } from '../../contracts/app-use-case'
import { SkipQuestionUseCaseDTO } from './skip-question.dto'

export class SkipQuestionController extends AppController {
  constructor(private skipQuestionUseCase: AppUseCase<SkipQuestionUseCaseDTO>) {
    super()
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: subscriptionId } = request.params

    await this.skipQuestionUseCase.execute({
      subscriptionId,
      userId: request.userId
    })

    return response.sendStatus(200)
  }
}
