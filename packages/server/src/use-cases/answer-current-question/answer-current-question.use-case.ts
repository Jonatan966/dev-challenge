import { AppUseCase } from '../../contracts/app-use-case'
import { databaseClient } from '../../prisma/client'
import { AppError } from '../../utils/error-handler'
import {
  AnswerCurrentQuestionUseCaseDTO,
  AnswerStatus
} from './answer-current-question.dto'

interface UserGainExperienceProps {
  userId: string
  difficultyWeight: number
  questionsCount: number
}

export class AnswerCurrentQuestionUseCase extends AppUseCase<
  AnswerCurrentQuestionUseCaseDTO,
  AnswerStatus
> {
  public async execute({
    answerId,
    subscriptionId,
    userId
  }: AnswerCurrentQuestionUseCaseDTO): Promise<AnswerStatus> {
    const subscriptionExists = await this.getSubscriptionInformations(
      subscriptionId,
      userId
    )

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

    const currentQuestion = await this.getQuestionInformations(
      subscriptionId,
      subscriptionExists.currentPosition,
      answerId
    )

    if (!currentQuestion.question.answers.length) {
      throw new AppError({
        statusCode: 400,
        message: 'Resposta não encontrada'
      })
    }

    if (currentQuestion.answerId) {
      throw new AppError({
        statusCode: 400,
        message: 'Pergunta já respondida'
      })
    }

    const currentAnswer = currentQuestion.question.answers[0]

    await databaseClient.questionOrder.update({
      where: {
        subscriptionId_questionId_position: {
          position: subscriptionExists.currentPosition,
          questionId: currentQuestion.question.id,
          subscriptionId: subscriptionExists.id
        }
      },
      data: {
        answerId: currentAnswer.id
      }
    })

    let successStatus = {}

    if (currentAnswer.isCorrect) {
      successStatus = await this.userGainExperience({
        difficultyWeight: subscriptionExists.challenge.difficulty.weight,
        questionsCount: subscriptionExists._count.questionOrder,
        userId
      })
    }

    if (subscriptionExists.questionOrder.length > 1) {
      await this.goToNextQuestion(
        subscriptionId,
        subscriptionExists.currentPosition,
        subscriptionExists.questionOrder
      )
    } else {
      await this.finishChallenge(subscriptionId)
    }

    return {
      isCorrect: currentAnswer.isCorrect,
      ...successStatus
    }
  }

  private async userGainExperience({
    difficultyWeight,
    questionsCount,
    userId
  }: UserGainExperienceProps): Promise<Omit<AnswerStatus, 'isCorrect'>> {
    let experienceGained = Math.floor(Math.random() * 40) + 25 // 25 to 40

    experienceGained *= difficultyWeight
    experienceGained /= questionsCount

    const currentUser = await databaseClient.user.update({
      where: {
        id: userId
      },
      data: {
        current_experience: {
          increment: experienceGained
        }
      },
      select: {
        current_experience: true,
        current_level: true
      }
    })

    let experienceToNextLevel = this.calculateExperienceToNextLevel(
      currentUser.current_level
    )

    const wentToTheNextLevel =
      currentUser.current_experience >= experienceToNextLevel

    if (wentToTheNextLevel) {
      await databaseClient.user.update({
        where: {
          id: userId
        },
        data: {
          current_level: {
            increment: 1
          },
          current_experience: 0
        }
      })

      experienceToNextLevel = this.calculateExperienceToNextLevel(
        currentUser.current_level + 1
      )
    }

    return {
      experienceGained,
      experienceToNextLevel,
      currentLevel: currentUser.current_level + Number(wentToTheNextLevel)
    }
  }

  private calculateExperienceToNextLevel(currentLevel: number) {
    return Math.pow((currentLevel + 1) * 9, 2)
  }

  private async getSubscriptionInformations(id: string, userId: string) {
    return await databaseClient.challengeSubscription.findFirst({
      where: {
        id,
        userId
      },
      select: {
        currentPosition: true,
        finishedAt: true,
        id: true,
        _count: {
          select: {
            questionOrder: true
          }
        },
        questionOrder: {
          select: {
            position: true
          },
          orderBy: {
            position: 'asc'
          },
          where: {
            answerId: {
              equals: null
            }
          }
        },
        challenge: {
          select: {
            difficulty: {
              select: {
                weight: true
              }
            }
          }
        }
      }
    })
  }

  private async getQuestionInformations(
    subscriptionId: string,
    currentPosition: number,
    answerId: string
  ) {
    return await databaseClient.questionOrder.findFirst({
      where: {
        subscriptionId,
        position: currentPosition
      },
      select: {
        question: {
          select: {
            id: true,
            answers: {
              select: {
                id: true,
                isCorrect: true
              },
              where: {
                id: answerId
              }
            }
          }
        },
        answerId: true
      }
    })
  }

  private async goToNextQuestion(
    subscriptionId: string,
    currentPosition: number,
    questionList: Array<{ position: number }>
  ) {
    let nextQuestionIndex =
      questionList.findIndex(
        question => question.position === currentPosition
      ) + 1

    if (!questionList[nextQuestionIndex]) {
      nextQuestionIndex = 0
    }

    await databaseClient.challengeSubscription.update({
      where: {
        id: subscriptionId
      },
      data: {
        currentPosition: questionList[nextQuestionIndex].position
      }
    })
  }

  private async finishChallenge(subscriptionId: string) {
    await databaseClient.challengeSubscription.update({
      where: {
        id: subscriptionId
      },
      data: {
        finishedAt: new Date()
      }
    })
  }
}
