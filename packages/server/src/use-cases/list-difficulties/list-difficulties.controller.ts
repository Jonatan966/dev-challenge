import { Difficulty } from '@prisma/client'
import { Request, Response } from 'express'

import { AppController } from '../../contracts/app-controller'
import { AppUseCase } from '../../contracts/app-use-case'

export class ListDifficultiesController extends AppController {
  constructor(
    private listDifficultiesUseCase: AppUseCase<unknown, Difficulty[]>
  ) {
    super()
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const difficulties = await this.listDifficultiesUseCase.execute()

    return response.json(difficulties)
  }
}
