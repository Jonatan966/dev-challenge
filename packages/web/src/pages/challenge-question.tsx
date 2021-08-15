import {
  Box,
  Button,
  Flex,
  Grid,
  Spacer,
  Text,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { AnswerCard } from '../components/answer-card'
import { ChallengeHeader } from '../components/challenge-header'
import { PrimaryProgress } from '../components/primary-progress'
import { useChallenge } from '../contexts/challenge-context'
import { LoadingTrigger } from '../contexts/loading-context'

export function ChallengeQuestionPage(): JSX.Element {
  const {
    currentChallenge,
    currentQuestion,
    isLoadingQuestion,
    isLoadingAnswer,
    answerCurrentQuestion,
    selectAnswer,
    markCorrectAnswerStatus,
    getCurrentQuestion,
    getChallengeInformations,
    isLoadingChallenge,
    skipCurrentQuestion
  } = useChallenge()
  const [isConfirmedAnswer, setIsConfirmedAnswer] = useState(false)

  const toast = useToast()
  const history = useHistory()

  if (
    !isLoadingQuestion &&
    !(currentChallenge || currentChallenge?.subscription)
  ) {
    return <h1>ops</h1>
  }

  const isAbleToConfirm = currentQuestion.answers.some(
    answer => answer.isChecked
  )

  const currentQuestionNumber =
    (currentChallenge?.subscription?.answeredQuestionsCount || 0) + 1

  async function confirmAnswer() {
    try {
      const { id: answerId } = currentQuestion.answers.find(
        answer => answer.isChecked
      )

      const answerStatus = await answerCurrentQuestion(answerId)

      markCorrectAnswerStatus(answerId, answerStatus.isCorrect)
      setIsConfirmedAnswer(true)

      if (!answerStatus.isCorrect) {
        toast({
          title: 'Resposta incorreta',
          description: 'Pelo jeito você precisa estudar um pouco mais',
          status: 'error'
        })

        return
      }

      toast({
        title: 'Resposta correta!',
        description: (
          <>
            Você ganhou <strong>{answerStatus.experienceGained}xp</strong>.
            Faltam <strong>{answerStatus.experienceToNextLevel}xp</strong> para
            o nível <strong>{answerStatus.currentLevel + 1}</strong>
          </>
        ),
        status: 'success'
      })
    } catch (error) {
      alert('erro ' + error)
    }
  }

  async function goToNextQuestion() {
    setIsConfirmedAnswer(false)

    await getChallengeInformations(currentChallenge.id)
    await getCurrentQuestion(currentChallenge.subscription.id)
  }

  function finishChallenge() {
    history.replace(`/challenges/${currentChallenge.id}`)
  }

  if (isLoadingQuestion) {
    return <LoadingTrigger />
  }

  return (
    <Flex flexDir="column" minHeight="100vh">
      <Box display="flex" as="header" flexDir="column" alignItems="stretch">
        <ChallengeHeader
          title={currentChallenge.title}
          iconUrl={currentChallenge.iconURL}
        />

        <Box pl={5} pt={5} pr={5}>
          <Flex>
            <Text>Questão {currentQuestionNumber}</Text>
            <Spacer />
            <Text>de {currentChallenge.questionsCount}</Text>
          </Flex>
          <PrimaryProgress
            value={currentQuestionNumber}
            max={currentChallenge.questionsCount}
            colorScheme="yellow"
            mt={2}
          />
        </Box>
      </Box>

      <Box as="main" flex={1} p={5}>
        <Text fontSize="xl" fontWeight="semibold">
          {currentQuestion.title}
        </Text>

        <Grid templateRows="repeat(4, 1fr)" mt={4} gridGap={2}>
          {currentQuestion.answers.map(answer => (
            <AnswerCard
              answer={answer}
              key={answer.id}
              onCheck={selectAnswer}
              isDisabled={isConfirmedAnswer || isConfirmedAnswer}
            />
          ))}
        </Grid>
      </Box>

      <Grid
        as="footer"
        templateColumns="repeat(2, 1fr)"
        gridGap={2}
        p={5}
        position="sticky"
        bottom={0}
        background="white"
      >
        <Button
          colorScheme="gray"
          variant="outline"
          disabled={
            isConfirmedAnswer ||
            currentQuestion.hasSkipped ||
            currentChallenge.questionsCount -
              currentChallenge.subscription.answeredQuestionsCount <=
              1
          }
          onClick={skipCurrentQuestion}
        >
          Pular
        </Button>
        <Button
          colorScheme="green"
          isLoading={isLoadingAnswer || isLoadingChallenge}
          onClick={(() => {
            if (isConfirmedAnswer) {
              if (currentQuestionNumber === currentChallenge.questionsCount) {
                return finishChallenge
              }

              return goToNextQuestion
            }

            return confirmAnswer
          })()}
          disabled={!isAbleToConfirm}
        >
          {isConfirmedAnswer ? (
            <>
              {currentQuestionNumber === currentChallenge.questionsCount
                ? 'Finalizar'
                : 'Continuar'}
            </>
          ) : (
            'Confirmar resposta'
          )}
        </Button>
      </Grid>
    </Flex>
  )
}
