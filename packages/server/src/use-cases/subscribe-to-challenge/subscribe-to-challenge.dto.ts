import { Subscription } from '@dev-challenge/entities'

export interface SubscribeToChallengeUseCaseDTO {
  userId: string
  challengeId: string
}

export type MappedSubscription = {
  subscription: Pick<Subscription, 'id'>
}
