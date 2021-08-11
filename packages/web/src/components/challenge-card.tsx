import { Text, Flex, Image } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import { Challenge } from '@dev-challenge/entities'

import { PrimaryBox } from '../components/primary-box'
import { PrimaryProgress } from './primary-progress'

interface ChallengeCardProps {
  challenge: Challenge
}

export function ChallengeCard({
  challenge: { title, subscription, questionsCount, id }
}: ChallengeCardProps): JSX.Element {
  const router = useHistory()

  return (
    <PrimaryBox onClick={() => router.push(`/challenges/${id}`)} as="button">
      <Image src="/icons/icon.png" />
      <Text fontWeight="bold" fontSize="sm" textAlign="start" mt={3} mb={3}>
        {title}
      </Text>

      {subscription ? (
        <Flex alignItems="center" gridGap={2}>
          <Text fontSize="x-small" color="gray.500">
            {subscription.answeredQuestionsCount} de {questionsCount}
          </Text>
          <PrimaryProgress
            value={subscription.answeredQuestionsCount}
            max={questionsCount}
            flex={1}
          />
        </Flex>
      ) : (
        <Text fontSize="sm">Não iniciou ainda</Text>
      )}
    </PrimaryBox>
  )
}
