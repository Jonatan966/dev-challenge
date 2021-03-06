import { Challenge } from '@dev-challenge/entities'

import { AppUseCase } from '../../contracts/app-use-case'
import { databaseClient } from '../../prisma/client'
import { ListChallengesUseCaseDTO } from './list-challenges.dto'

export class ListChallengesUseCase extends AppUseCase<
  ListChallengesUseCaseDTO,
  Challenge[]
> {
  public async execute({
    userId,
    difficultyId
  }: ListChallengesUseCaseDTO): Promise<Challenge[]> {
    const query = {
      where: undefined
    }

    if (difficultyId) {
      query.where = {
        difficultyId
      }
    }

    const challenges = await databaseClient.challenge.findMany({
      ...query,
      select: {
        id: true,
        title: true,
        difficultyId: true,
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
            questionOrder: {
              select: {
                subscriptionId: true
              },
              where: {
                answerId: {
                  not: null
                }
              }
            }
          }
        }
      }
    })

    const mappedChallenges = challenges.map(challenge => {
      let checkSubscription = {}

      if (challenge.subscriptions.length) {
        checkSubscription = {
          subscription: {
            answeredQuestionsCount:
              challenge.subscriptions[0].questionOrder.length
          }
        }
      }

      return {
        id: challenge.id,
        title: challenge.title,
        difficultyId: challenge.difficultyId,
        iconURL: challenge.iconURL,
        questionsCount: challenge._count.questions,
        ...checkSubscription
      }
    })

    return mappedChallenges
  }
}
