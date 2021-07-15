import { Box, Button, Flex, Grid, Spacer, Text } from '@chakra-ui/react'

import { AnswerCard } from '../components/answer-card'
import { ChallengeHeader } from '../components/challenge-header'
import { PrimaryProgress } from '../components/primary-progress'

export function ChallengeQuestionPage(): JSX.Element {
  return (
    <Flex flexDir="column" minHeight="100vh">
      <Box display="flex" as="header" flexDir="column" alignItems="stretch">
        <ChallengeHeader />

        <Box pl={5} pt={5} pr={5}>
          <Flex>
            <Text>Questão 1</Text>
            <Spacer />
            <Text>de 10</Text>
          </Flex>
          <PrimaryProgress value={25} mt={2} />
        </Box>
      </Box>

      <Box as="main" flex={1} p={5}>
        <Text fontSize="xl" fontWeight="semibold">
          O que o Flutter faz em sua totalidade?
        </Text>

        <Grid templateRows="repeat(4, 1fr)" mt={4} gridGap={2}>
          <AnswerCard />
          <AnswerCard />
          <AnswerCard />
          <AnswerCard />
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
        <Button colorScheme="gray" variant="outline">
          Pular
        </Button>
        <Button colorScheme="green">Confirmar</Button>
      </Grid>
    </Flex>
  )
}
