import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Spacer,
  Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'

import { ChallengeHeader } from '../components/challenge-header'
import { PrimaryBox } from '../components/primary-box'
import { PrimaryProgress } from '../components/primary-progress'
import { ProgressInfoCard } from '../components/progress-info-card'

import { useChallenge } from '../contexts/challenge-context'
import { LoadingTrigger } from '../contexts/loading-context'

export function ChallengeDetailsPage(): JSX.Element {
  const params = useParams<{ id: string }>()
  const history = useHistory()

  const [isEnteringInChallenge, setIsEnteringInChallenge] = useState(false)

  const {
    getChallengeInformations,
    currentChallenge,
    isLoadingChallenge,
    getCurrentQuestion,
    isLoadingQuestion,
    subscribeToCurrentChallenge,
    updateChallengeSubscription
  } = useChallenge()

  useEffect(() => {
    getChallengeInformations(params.id)
  }, [])

  if (isLoadingChallenge) {
    return <LoadingTrigger />
  }

  if (!currentChallenge) {
    return <Redirect to="/404" />
  }

  const parsedAnsweredQuestionsCount =
    currentChallenge?.subscription?.answeredQuestionsCount || 0
  const remainingQuestionsCount =
    currentChallenge.questionsCount - parsedAnsweredQuestionsCount
  const hasFinished = !!currentChallenge?.subscription?.finishedAt

  async function handleGoToCurrentQuestion(subscriptionId?: string) {
    const hasGetted = await getCurrentQuestion(subscriptionId)

    if (!hasGetted) {
      return
    }

    history.push('/challenge')
  }

  async function handleEnterOnChallenge() {
    setIsEnteringInChallenge(true)

    const subscriptionObject = await subscribeToCurrentChallenge()

    if (subscriptionObject) {
      updateChallengeSubscription({
        ...subscriptionObject,
        answeredQuestionsCount: 0
      })
      await handleGoToCurrentQuestion(subscriptionObject.id)
    }

    setIsEnteringInChallenge(false)
  }

  return (
    <Flex flexDir="column" height="100vh">
      <ChallengeHeader
        title={currentChallenge.title}
        iconUrl={currentChallenge.iconURL}
      />

      <Flex flexDir="column" p={5} flex={1} as="main" gridGap={5}>
        <Box as="section">
          <Heading fontSize="xl" mb={2}>
            Descrição
          </Heading>
          <Text>{currentChallenge.description}</Text>
        </Box>

        <Box
          as="section"
          hidden={
            !currentChallenge.subscription ||
            hasFinished ||
            isEnteringInChallenge
          }
        >
          <ProgressInfoCard
            value={parsedAnsweredQuestionsCount}
            max={currentChallenge.questionsCount}
            title="Em andamento"
          >
            Faltam <strong>{remainingQuestionsCount} questões</strong> para
            finalizar o desafio
          </ProgressInfoCard>
        </Box>

        <Box as="section" hidden={!hasFinished}>
          <Heading fontSize="xl" mb={2}>
            Resultado final
          </Heading>
          <Flex>
            <Text>
              <strong>
                {currentChallenge?.subscription?.correctAnswersCount || 0}
              </strong>{' '}
              acertos
            </Text>
            <Spacer />
            <Text>
              de <strong>{currentChallenge.questionsCount}</strong> questões
            </Text>
          </Flex>
          <PrimaryProgress
            background="red.400"
            value={currentChallenge?.subscription?.correctAnswersCount || 0}
            max={currentChallenge.questionsCount}
          />
        </Box>

        <Grid
          as="section"
          templateColumns="repeat(2, 1fr)"
          gap={2}
          hidden={!hasFinished}
        >
          <PrimaryBox>
            <strong>Começou em:</strong> 12/12/2012 às 12:00
          </PrimaryBox>
          <PrimaryBox>
            <strong>Terminou em:</strong> 12/12/2012 às 12:00
          </PrimaryBox>
        </Grid>
      </Flex>

      <Flex
        as="footer"
        flexDir="column"
        p={5}
        borderTop="1px"
        borderColor="gray.300"
        background="#F5F5FA"
      >
        <Button
          background="green.400"
          colorScheme="green"
          isLoading={isLoadingQuestion || isEnteringInChallenge}
          disabled={hasFinished}
          onClick={
            currentChallenge.subscription
              ? () => handleGoToCurrentQuestion()
              : handleEnterOnChallenge
          }
        >
          {hasFinished ? 'Finalizado' : 'Entrar'}
        </Button>
      </Flex>
    </Flex>
  )
}
