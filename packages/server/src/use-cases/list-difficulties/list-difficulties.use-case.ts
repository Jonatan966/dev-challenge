import { Difficulty } from '@dev-challenge/entities'

import { AppUseCase } from '../../contracts/app-use-case'
import { databaseClient } from '../../prisma/client'

export class ListDifficultiesUseCase extends AppUseCase<unknown, Difficulty[]> {
  public async execute(): Promise<Difficulty[]> {
    const difficulties = await databaseClient.difficulty.findMany({
      orderBy: {
        weight: 'asc'
      }
    })

    return difficulties
  }
}
