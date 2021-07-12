import { ChallengeSubscription } from '@prisma/client'

export interface SubscribeToChallengeUseCaseDTO {
  userId: string
  challengeId: string
}

export type MappedSubscription = {
  subscription: Pick<ChallengeSubscription, 'id'>
}
