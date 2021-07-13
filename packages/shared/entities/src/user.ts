export interface User {
  id: string
  name: string
  avatarUrl: string
  currentLevel: number
  currentExperience: number
  experienceToNextLevel: number
  completedChallengesCount?: number
}
