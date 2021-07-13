export interface Subscription {
  id?: string
  startedAt?: Date
  finishedAt?: Date
  answeredQuestionsCount: number
  correctAnswersCount: number
}
