import { AppUseCase } from '../../contracts/app-use-case'
import { databaseClient } from '../../prisma/client'
import { AppError } from '../../utils/error-handler'
import {
  MappedCurrentQuestion,
  ShowCurrentQuestionUseCaseDTO
} from './show-current-question.dto'

export class ShowCurrentQuestionUseCase extends AppUseCase<
  ShowCurrentQuestionUseCaseDTO,
  MappedCurrentQuestion
> {
  public async execute({
    subscriptionId,
    userId
  }: ShowCurrentQuestionUseCaseDTO): Promise<MappedCurrentQuestion> {
    const subscriptionExists =
      await databaseClient.challengeSubscription.findFirst({
        where: {
          id: subscriptionId,
          userId
        },
        select: {
          currentPosition: true,
          finishedAt: true
        }
      })

    if (!subscriptionExists) {
      throw new AppError({
        statusCode: 400,
        message: 'Inscrição não encontrada'
      })
    }

    if (subscriptionExists.finishedAt) {
      throw new AppError({
        statusCode: 400,
        message: 'Esse desafio já foi finalizado'
      })
    }

    const currentQuestion = await databaseClient.questionOrder.findFirst({
      where: {
        subscriptionId,
        position: subscriptionExists.currentPosition
      },
      select: {
        question: {
          select: {
            id: true,
            title: true,
            answers: {
              select: {
                id: true,
                title: true
              }
            }
          }
        },
        hasSkipped: true
      }
    })

    return {
      ...currentQuestion.question,
      hasSkipped: currentQuestion.hasSkipped
    }
  }
}
