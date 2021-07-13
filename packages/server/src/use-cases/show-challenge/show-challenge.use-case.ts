import { Challenge } from '@dev-challenge/entities'

import { AppUseCase } from '../../contracts/app-use-case'
import { databaseClient } from '../../prisma/client'
import { AppError } from '../../utils/error-handler'
import { ShowChallengeUseCaseDTO } from './show-challenge.dto'

export class ShowChallengeUseCase extends AppUseCase<
  ShowChallengeUseCaseDTO,
  Challenge
> {
  public async execute({
    userId,
    challengeId
  }: ShowChallengeUseCaseDTO): Promise<Challenge> {
    const findedChallenge = await databaseClient.challenge.findFirst({
      where: {
        id: challengeId
      },
      select: {
        id: true,
        title: true,
        description: true,
        difficulty: true,
        iconURL: true,
        _count: {
          select: {
            questions: true
          }
        },
        subscriptions: {
          where: {
            userId
          },
          select: {
            id: true,
            startedAt: true,
            finishedAt: true
          }
        }
      }
    })

    if (!findedChallenge) {
      throw new AppError({
        statusCode: 400,
        message: 'Desafio não encontrado'
      })
    }

    let mappedSubscription = {}

    if (findedChallenge.subscriptions.length) {
      const challengeSubscription = findedChallenge.subscriptions[0]

      const answeredQuestionsCount = await databaseClient.questionOrder.count({
        where: {
          subscriptionId: challengeSubscription.id,
          answerId: {
            not: null
          }
        }
      })

      const correctAnswersCount = await databaseClient.questionOrder.count({
        where: {
          subscriptionId: challengeSubscription.id,
          answerId: {
            not: null
          },
          AND: {
            answer: {
              isCorrect: true
            }
          }
        }
      })

      mappedSubscription = {
        subscription: {
          id: challengeSubscription.id,
          startedAt: challengeSubscription.startedAt,
          finishedAt: challengeSubscription.finishedAt,
          answeredQuestionsCount,
          correctAnswersCount
        }
      }
    }

    const mappedChallenge: Challenge = {
      id: findedChallenge.id,
      title: findedChallenge.title,
      description: findedChallenge.description,
      difficulty: findedChallenge.difficulty,
      iconURL: findedChallenge.iconURL,
      questionsCount: findedChallenge._count.questions,
      ...mappedSubscription
    }

    return mappedChallenge
  }
}
