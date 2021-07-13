import { Answer } from './answer'

export interface Question {
  id: string
  title: string
  answers: Answer[]
  hasSkipped: boolean
}
