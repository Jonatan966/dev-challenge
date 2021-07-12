export interface ShowCurrentQuestionUseCaseDTO {
  userId: string
  subscriptionId: string
}

export interface MappedCurrentQuestion {
  id: string
  title: string
  answers: {
    id: string
    title: string
  }[]
  hasSkipped: boolean
}
