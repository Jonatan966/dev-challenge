import { AppUseCase } from '../../contracts/app-use-case'
import { MappedChallenge } from '../../entities/mapped-challenge'
import { databaseClient } from '../../prisma/client'
import { AppError } from '../../utils/error-handler'
import { ShowChallengeUseCaseDTO } from './show-challenge.dto'

export class ShowChallengeUseCase extends AppUseCase<
  ShowChallengeUseCaseDTO,
  MappedChallenge
> {
  public async execute({
    userId,
    challengeId
  }: ShowChallengeUseCaseDTO): Promise<MappedChallenge> {
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
            id: true,
            startedAt: true,
            finishedAt: true,
            _count: {
              select: {
                questionOrder: true
              }
            }
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

      mappedSubscription = {
        subscription: {
          id: challengeSubscription.id,
          startedAt: challengeSubscription.startedAt,
          finishedAt: challengeSubscription.finishedAt,
          answeredQuestionsCount: challengeSubscription._count.questionOrder
        }
      }
    }

    const mappedChallenge: MappedChallenge = {
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
