import { RefreshToken } from '@prisma/client'

export interface AuthObject {
  token: string
  refreshToken?: RefreshToken
}
