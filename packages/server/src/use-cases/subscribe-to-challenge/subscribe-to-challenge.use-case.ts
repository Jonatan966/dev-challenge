import { AppUseCase } from '../../contracts/app-use-case'
import { databaseClient } from '../../prisma/client'
import { AppError } from '../../utils/error-handler'
import { shuffleArray } from '../../utils/shuffle-array'
import {
  MappedSubscription,
  SubscribeToChallengeUseCaseDTO
} from './subscribe-to-challenge.dto'

export class SubscribeToChallengeUseCase extends AppUseCase<
  SubscribeToChallengeUseCaseDTO,
  MappedSubscription
> {
  public async execute({
    userId,
    challengeId
  }: SubscribeToChallengeUseCaseDTO): Promise<MappedSubscription> {
    const targetChallenge = await databaseClient.challenge.findFirst({
      select: {
        id: true,
        questions: {
          select: {
            id: true
          }
        },
        subscriptions: {
          select: {
            userId: true
          },
          where: {
            userId
          }
        }
      },
      where: {
        id: challengeId
      }
    })

    if (!targetChallenge) {
      throw new AppError({
        statusCode: 400,
        message: 'Desafio não encontrado'
      })
    }

    if (targetChallenge.subscriptions.length) {
      throw new AppError({
        statusCode: 400,
        message: 'Você já está inscrito(a) nesse desafio'
      })
    }

    const shuffledQuestions = shuffleArray(targetChallenge.questions)

    try {
      const mappedQuestionOrders = shuffledQuestions.map(
        (question, questionPosition) => ({
          position: questionPosition + 1,
          questionId: question.id
        })
      )

      const subscription = await databaseClient.challengeSubscription.create({
        data: {
          currentPosition: 1,
          challengeId: targetChallenge.id,
          userId,
          questionOrder: {
            create: mappedQuestionOrders
          }
        },
        select: {
          id: true
        }
      })

      return {
        subscription
      }
    } catch (e) {
      console.log(e)
      throw new AppError({
        statusCode: 500,
        message: 'Não foi possível se inscrever nesse desafio'
      })
    }
  }
}
