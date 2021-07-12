export interface AnswerCurrentQuestionUseCaseDTO {
  subscriptionId: string
  userId: string
  answerId: string
}

export interface AnswerStatus {
  isCorrect: boolean
  experienceGained?: number
  experienceToNextLevel?: number
  currentLevel?: number
}
