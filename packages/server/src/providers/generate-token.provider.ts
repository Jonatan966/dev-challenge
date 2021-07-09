import { sign } from 'jsonwebtoken'

export class GenerateTokenProvider {
  execute(userId: string): string {
    const token = sign(
      {
        sub: userId
      },
      process.env.TOKEN_GENERATOR_SECRET,
      {
        expiresIn: '30s'
      }
    )

    return token
  }
}
