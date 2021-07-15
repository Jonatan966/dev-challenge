import { Box, Grid, Wrap } from '@chakra-ui/react'

import { ChallengeCard } from '../components/challenge-card'
import { DifficultyPill } from '../components/difficulty-pill'
import { UserInfoHeader } from '../components/user-info-header'

export function HomePage(): JSX.Element {
  return (
    <>
      <UserInfoHeader />

      <Box as="main" ml="5" mr="5">
        <Wrap mb="5" as="section">
          {['Fácil', 'Médio', 'Difícil', 'Perito'].map((name, key) => (
            <DifficultyPill key={key} title={name} />
          ))}
        </Wrap>

        <Grid templateColumns="repeat(2, 1fr)" gap={2} pb={5} as="section">
          <ChallengeCard />
          <ChallengeCard />
          <ChallengeCard />
          <ChallengeCard />
          <ChallengeCard />
          <ChallengeCard />
        </Grid>
      </Box>
    </>
  )
}
