import { Box, Center, Grid, Spinner, Text, Wrap } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Challenge, Difficulty } from '@dev-challenge/entities'

import { ChallengeCard } from '../components/challenge-card'
import { DifficultyPill } from '../components/difficulty-pill'
import { UserInfoHeader } from '../components/user-info-header'
import { api } from '../services/api'

export function HomePage(): JSX.Element {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [difficulties, setDifficulties] = useState<Difficulty[]>([])
  const [isLoadingChallenges, setIsLoadingChallenges] = useState(true)

  useEffect(() => {
    setIsLoadingChallenges(true)

    api
      .get<Challenge[]>('/challenges')
      .then(challengesResponse => {
        if (!challengesResponse) {
          return
        }

        setChallenges(challengesResponse.data)
      })
      .finally(() => {
        setIsLoadingChallenges(false)
      })

    api.get<Difficulty[]>('/difficulties').then(difficultiesResponse => {
      setDifficulties(difficultiesResponse.data)
    })
  }, [])

  return (
    <>
      <UserInfoHeader />

      <Box as="main" ml="5" mr="5">
        <Wrap mb="5" as="section">
          {difficulties.map((difficulty, key) => (
            <DifficultyPill key={key} difficulty={difficulty} />
          ))}
        </Wrap>

        {!challenges.length && !isLoadingChallenges && (
          <Text fontSize="xl" textAlign="center" fontWeight="semibold">
            Nada aqui
          </Text>
        )}

        {isLoadingChallenges ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <Grid templateColumns="repeat(2, 1fr)" gap={2} pb={5} as="section">
            {challenges.map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </Grid>
        )}
      </Box>
    </>
  )
}
