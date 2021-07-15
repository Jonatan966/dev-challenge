import { User } from '@dev-challenge/entities'

import { AppUseCase } from '../../contracts/app-use-case'
import { databaseClient } from '../../prisma/client'
import { AppError } from '../../utils/error-handler'
import { ShowUserUseCaseDTO } from './show-user.dto'

export class ShowUserUseCase extends AppUseCase<ShowUserUseCaseDTO, User> {
  public async execute({ userId, hasAuth }: ShowUserUseCaseDTO): Promise<User> {
    const findedUser = await databaseClient.user.findFirst({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        email: hasAuth,
        avatar_url: true,
        current_experience: true,
        current_level: true,
        subscriptions: {
          select: {
            id: true
          },
          where: {
            finishedAt: {
              not: null
            }
          }
        }
      }
    })

    if (!findedUser) {
      throw new AppError({
        statusCode: 400,
        errorType: 'input',
        fields: {
          userId: 'Este usuário não existe'
        }
      })
    }

    const experienceToNextLevel = Math.pow(
      (findedUser.current_level + 1) * 9,
      2
    )

    const mappedUser: User = {
      id: findedUser.id,
      avatarUrl: findedUser.avatar_url,
      name: findedUser.name,
      currentExperience: findedUser.current_experience,
      currentLevel: findedUser.current_level,
      completedChallengesCount: findedUser.subscriptions.length,
      experienceToNextLevel
    }

    return mappedUser
  }
}
