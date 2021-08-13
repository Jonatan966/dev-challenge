import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { useState, useContext, createContext, ReactNode } from 'react'

import {
  AnswerStatus,
  AppErrorConfig,
  Challenge,
  Question,
  Subscription
} from '../../../shared/entities'
import { api } from '../services/api'

type ShortSubscription = Pick<Subscription, 'id' | 'answeredQuestionsCount'>

interface ChallengeProviderProps {
  children?: ReactNode
}

interface ChallengeContextProps {
  currentChallenge?: Challenge
  currentQuestion?: Question

  isLoadingAnswer: boolean
  isLoadingChallenge: boolean
  isLoadingQuestion: boolean

  getChallengeInformations(challengeId: string): Promise<void>
  getCurrentQuestion(subscriptionId?: string): Promise<boolean>
  answerCurrentQuestion(): Promise<AnswerStatus>
  subscribeToCurrentChallenge(): Promise<false | ShortSubscription>
  updateChallengeSubscription(subscriptionObject: ShortSubscription): void
  selectAnswer(answerId: string): void
  markCorrectAnswerStatus(answerId: string, isCorrect: boolean): void
}

type UseChallenge = () => ChallengeContextProps

const ChallengeContext = createContext({} as ChallengeContextProps)

export function ChallengeProvider({
  children
}: ChallengeProviderProps): JSX.Element {
  const toaster = useToast()

  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(
    null
  )
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)

  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)
  const [isLoadingChallenge, setIsLoadingChallenge] = useState(true)
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false)

  async function getChallengeInformations(challengeId: string) {
    try {
      setIsLoadingChallenge(true)

      const { data: challengeInformations } = await api.get<Challenge>(
        `/challenges/${challengeId}`
      )

      setCurrentChallenge(challengeInformations)
    } catch (error) {
      const parsedError = (error as AxiosError).response.data as AppErrorConfig

      toaster({
        title: 'Erro ao tentar recuperar o desafio',
        description: parsedError.message,
        status: 'error'
      })
    } finally {
      setIsLoadingChallenge(false)
    }
  }

  async function getCurrentQuestion(subscriptionId?: string) {
    const parsedSubscriptionId =
      subscriptionId ?? currentChallenge?.subscription?.id

    if (!currentChallenge || !parsedSubscriptionId) {
      return false
    }

    setIsLoadingQuestion(true)

    try {
      const { data: question } = await api.get<Question>(
        `/subscriptions/${parsedSubscriptionId}/current-question`
      )

      setCurrentQuestion(question)

      return true
    } catch (error) {
      const parsedError = (error as AxiosError).response.data as AppErrorConfig

      toaster({
        title: 'Erro ao tentar recuperar a questão',
        description: parsedError.message,
        status: 'error'
      })
    } finally {
      setIsLoadingQuestion(false)
    }
  }

  function updateChallengeSubscription(subscriptionObject: ShortSubscription) {
    setCurrentChallenge(challenge => ({
      ...challenge,
      subscription: subscriptionObject as any
    }))
  }

  function selectAnswer(answerId: string) {
    setCurrentQuestion(question => ({
      ...question,
      answers: question.answers.map(answer => ({
        ...answer,
        isChecked: answer.id === answerId
      }))
    }))
  }

  function markCorrectAnswerStatus(answerId: string, isCorrect: boolean) {
    setCurrentQuestion(question => ({
      ...question,
      answers: question.answers.map(answer =>
        answer.id !== answerId ? answer : { ...answer, isCorrect }
      )
    }))
  }

  async function answerCurrentQuestion(): Promise<AnswerStatus> {
    if (!currentChallenge || !currentChallenge.subscription) return

    setIsLoadingAnswer(true)

    const { data: answerStatus } = await api.post<AnswerStatus>(
      `/subscriptions/${currentChallenge.subscription.id}/current-question`
    )

    setIsLoadingAnswer(false)

    return answerStatus
  }

  async function subscribeToCurrentChallenge() {
    try {
      const { data: subscriptionObject } = await api.get<{
        subscription: ShortSubscription
      }>(`/challenges/${currentChallenge.id}/subscribe`)

      return subscriptionObject.subscription
    } catch (error) {
      const parsedError = (error as AxiosError).response.data as AppErrorConfig

      toaster({
        title: 'Erro ao tentar se inscrever no desafio',
        description: parsedError.message,
        status: 'error'
      })

      return false
    }
  }

  return (
    <ChallengeContext.Provider
      value={{
        currentChallenge,
        currentQuestion,

        isLoadingAnswer,
        isLoadingChallenge,
        isLoadingQuestion,

        getChallengeInformations,
        getCurrentQuestion,
        answerCurrentQuestion,
        subscribeToCurrentChallenge,
        updateChallengeSubscription,
        selectAnswer,
        markCorrectAnswerStatus
      }}
    >
      {children}
    </ChallengeContext.Provider>
  )
}

export const useChallenge: UseChallenge = () => useContext(ChallengeContext)
