import { Difficulty } from '@prisma/client'

export interface MappedChallenge {
  id: string
  title: string
  description?: string
  difficultyId?: string
  difficulty?: Difficulty
  iconURL: string
  questionsCount: number
  subscription?: {
    id?: string
    startedAt?: Date
    finishedAt?: Date
    answeredQuestionsCount: number
    correctAnswersCount: number
  }
}
