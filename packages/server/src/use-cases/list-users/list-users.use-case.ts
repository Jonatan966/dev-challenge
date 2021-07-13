import { AppUseCase } from '../../contracts/app-use-case'
import { databaseClient } from '../../prisma/client'
import { MappedUser } from './list-users.dto'

export class ListUsersUseCase extends AppUseCase<unknown, MappedUser[]> {
  public async execute(): Promise<MappedUser[]> {
    const users = await databaseClient.user.findMany({
      orderBy: {
        current_level: 'asc'
      },
      select: {
        id: true,
        name: true,
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

    const mappedUsers = users.map(user => {
      const experienceToNextLevel = Math.pow((user.current_level + 1) * 9, 2)

      return {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatar_url,
        currentExperience: user.current_experience,
        currentLevel: user.current_level,
        experienceToNextLevel,
        completedChallengesCount: user.subscriptions.length
      }
    })

    return mappedUsers
  }
}
