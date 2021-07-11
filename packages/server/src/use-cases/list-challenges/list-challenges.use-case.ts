import { AppUseCase } from '../../contracts/app-use-case'
import { MappedChallenge } from '../../entities/mapped-challenge'
import { databaseClient } from '../../prisma/client'
import { ListChallengesUseCaseDTO } from './list-challenges.dto'

export class ListChallengesUseCase extends AppUseCase<
  ListChallengesUseCaseDTO,
  MappedChallenge[]
> {
  public async execute({
    userId,
    difficultyId
  }: ListChallengesUseCaseDTO): Promise<MappedChallenge[]> {
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
            userId,
            questionOrder: {
              every: {
                NOT: {
                  answer: undefined
                }
              }
            }
          },
          select: {
            _count: {
              select: {
                questionOrder: true
              }
            }
          }
        }
      }
    })

    const mappedChallenges = challenges.map(challenge => {
      let checkAnsweredQuestions = {}
      if (challenge.subscriptions.length) {
        checkAnsweredQuestions = {
          answeredQuestionsCount:
            challenge.subscriptions[0]._count.questionOrder
        }
      }

      return {
        id: challenge.id,
        title: challenge.title,
        difficultyId: challenge.difficultyId,
        iconURL: challenge.iconURL,
        questionsCount: challenge._count.questions,
        ...checkAnsweredQuestions
      }
    })

    return mappedChallenges
  }
}
