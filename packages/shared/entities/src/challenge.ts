import { Difficulty } from './difficulty'
import { Subscription } from './subscription'

export interface Challenge {
  id: string
  title: string
  description?: string
  difficultyId?: string
  difficulty?: Difficulty
  iconURL: string
  questionsCount: number
  subscription?: Subscription
}
