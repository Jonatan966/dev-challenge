import { AppUseCase } from '../../contracts/app-use-case'
import { databaseClient } from '../../prisma/client'
import { AppError } from '../../utils/error-handler'
import { SkipQuestionUseCaseDTO } from './skip-question.dto'

export class SkipQuestionUseCase extends AppUseCase<SkipQuestionUseCaseDTO> {
  public async execute({
    subscriptionId,
    userId
  }: SkipQuestionUseCaseDTO): Promise<void> {
    const currentSubscription =
      await databaseClient.challengeSubscription.findFirst({
        where: {
          id: subscriptionId,
          userId
        },
        select: {
          finishedAt: true,
          currentPosition: true,
          questionOrder: {
            select: {
              position: true,
              hasSkipped: true,
              questionId: true
            },
            orderBy: {
              position: 'asc'
            },
            where: {
              answerId: {
                equals: null
              }
            }
          }
        }
      })

    if (!currentSubscription) {
      throw new AppError({
        statusCode: 400,
        message: 'Inscrição não encontrada'
      })
    }

    if (currentSubscription.finishedAt) {
      throw new AppError({
        statusCode: 400,
        message: 'Esse desafio já foi finalizado'
      })
    }

    if (currentSubscription.questionOrder.length <= 1) {
      throw new AppError({
        statusCode: 400,
        message: 'Não é possível pular essa questão'
      })
    }

    const currentQuestionIndex = currentSubscription.questionOrder.findIndex(
      question => question.position === currentSubscription.currentPosition
    )
    const currentQuestion =
      currentSubscription.questionOrder[currentQuestionIndex]

    let nextQuestionIndex = currentQuestionIndex + 1

    if (currentQuestion.hasSkipped) {
      throw new AppError({
        statusCode: 400,
        message: 'Não é possível pular essa questão novamente'
      })
    }

    if (!currentSubscription.questionOrder[nextQuestionIndex]) {
      nextQuestionIndex = 0
    }

    try {
      await databaseClient.challengeSubscription.update({
        where: {
          id: subscriptionId
        },
        data: {
          currentPosition:
            currentSubscription.questionOrder[nextQuestionIndex].position,
          questionOrder: {
            update: {
              data: {
                hasSkipped: true
              },
              where: {
                subscriptionId_questionId_position: {
                  position: currentQuestion.position,
                  questionId: currentQuestion.questionId,
                  subscriptionId
                }
              }
            }
          }
        }
      })
    } catch {
      throw new AppError({
        statusCode: 500,
        message: 'Não foi possível pular essa questão'
      })
    }
  }
}
