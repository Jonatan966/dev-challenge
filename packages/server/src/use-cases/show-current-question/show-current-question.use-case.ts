import { Question } from '@dev-challenge/entities'

import { AppUseCase } from '../../contracts/app-use-case'
import { databaseClient } from '../../prisma/client'
import { AppError } from '../../utils/error-handler'
import { ShowCurrentQuestionUseCaseDTO } from './show-current-question.dto'

export class ShowCurrentQuestionUseCase extends AppUseCase<
  ShowCurrentQuestionUseCaseDTO,
  Question
> {
  public async execute({
    subscriptionId,
    userId
  }: ShowCurrentQuestionUseCaseDTO): Promise<Question> {
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
        errorType: 'input',
        fields: {
          subscriptionId: 'Inscrição não encontrada'
        }
      })
    }

    if (subscriptionExists.finishedAt) {
      throw new AppError({
        statusCode: 400,
        errorType: 'general',
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
