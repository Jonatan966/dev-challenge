export interface AuthObject {
  token: string
  refreshToken?: {
    id: string
    expiresIn: number
    userId: string
  }
}
