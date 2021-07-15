import { Request, Response } from 'express'
import { AuthObject } from '@dev-challenge/entities'
import { RefreshTokenUserDTO } from '@dev-challenge/dto'

import { AppController } from '../../contracts/app-controller'
import { AppUseCase } from '../../contracts/app-use-case'
import { AppError } from '../../utils/error-handler'

export class RefreshTokenUserController extends AppController<RefreshTokenUserDTO> {
  constructor(
    private refreshTokenUserUseCase: AppUseCase<RefreshTokenUserDTO, AuthObject>
  ) {
    super()
  }

  async handle(
    request: Request<unknown, unknown, RefreshTokenUserDTO>,
    response: Response
  ): Promise<Response> {
    const { refreshToken } = request.body

    if (!refreshToken) {
      throw new AppError({
        errorType: 'input',
        fields: {
          refreshToken: 'Informe um refresh token'
        },
        statusCode: 400
      })
    }

    const authObject = await this.refreshTokenUserUseCase.execute({
      refreshToken
    })

    return response.send(authObject)
  }
}
